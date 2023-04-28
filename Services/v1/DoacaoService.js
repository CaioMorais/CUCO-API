let Result = require("../../Domain/Entities/Result");
let doacaoSchema = require('../../Domain/Models/v1/DoacaoModel');
let clienteDoadorSchema = require('../../Domain/Models/v1/ClienteDoadorModel');
let carteira = require('../../Services/v1/CarteiraService');
let entregaRetiradasSchema = require('../../Domain/Models/v1/EntregaRetiradaModel');
let historicoEntregaRetiradasSchema = require("../../Domain/Models/v1/HistoricoEntregaRetiradas");
let carteiraSchema = require("../../Domain/Models/v1/CarteiraModel");
let estabelecimentoSchema = require("../../Domain/Models/v1/EstabelecimentoModel");
var nodemailer = require('nodemailer');
var efiService = require('./EfiService.js')

// function gerarQRCodeLinkDoacao(id){
//     try {
//         var apiQRCode = "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=";
//         var caminhoDoacao = "";       

//         // acessar o banco paara retornar o link real com os dados do estabelecimento ja prenchidos
//         var link = "www.estabelecimentox/paginadoacao"
//         var result = new Result(link, true, "link para doaçao", 200);
//         return result

//     } catch (error) {
//       var result = new Result(error, false, "Internal error", 500);
//       return result;
//     }

// }

async function cadastraDoacao(req, idRestaurante) {
    try {
        var result;
        var clienteAntigoBackup;
        var clienteNovo = false;

        //Verifica se o cliente ja existe, caso não, o cria.   
        var clienteDoador = await retornaClientePorCPF(req.body.cpf);
        if (clienteDoador == null) {
            clienteDoador = await criaClienteDoador(req.body)
            if (clienteDoador == null) {
                result = new Result(resultDoacao, false, "Doação não efetuada, não foi possivel localizar ou criar o doador!", 400);
                return result;
            }
            clienteNovo = true;
        }

        let restaurante = await estabelecimentoSchema.findOne({_id: idRestaurante})
        
        //EFI Cria Cobrança
        let cobranca = await efiService.gerarCobranca(req.body);
        console.log(cobranca);

        //Cria Doação
        var doacao = await criaDoacao(req.body, clienteDoador, idRestaurante, cobranca);
        console.log(doacao)
        if (doacao == null) {
            result = new Result(resultDoacao, false, "Doação não efetuada, não foi possivel criar a doação!", 400);
            return result;
        }

        //salva a doação, em caso de sucesso salva cliente ou atualiza seu pratos doados, depois insere valor na carteira
        if (await doacao.save()) {

            //verifica se o cliente é novo ou ja existente, atualiza seus pratos em caso de existente, ou apenas on salva em caso de novo cliente
            if (clienteNovo == false) {
                clienteAntigoBackup = clienteDoador;
                var valorTotaldeDoacoesDesseCliente = parseFloat(clienteDoador.totalPratosDoados) + parseFloat(req.body.quantidadePratosDoados);
                if (await clienteDoadorSchema.updateOne({ _id: clienteDoador._id }, { $set: { nome: req.body.nome, email: req.body.email, totalPratosDoados: valorTotaldeDoacoesDesseCliente } })) {
                    console.log("entrou")
                }
                else {
                    // erro ao atualizar pratos do cliente existente, doação é excluida
                    await doacaoSchema.deleteOne({ _id: doacao._id });
                    result = new Result(resultDoacao, false, "Doação não efetuada, não foi atualizar doações do doador!", 400);
                    return result;
                }
            }
            else if (!(await clienteDoador.save())) {
                //erro em caso de salvar cliente novo doação é excluida
                await doacaoSchema.deleteOne({ _id: doacao._id });
                result = new Result(resultDoacao, false, "Doação não efetuada, não foi possivel criar novo doador!", 400);
                return result;
            }

            //insere valor carteira
            var resultadoIncersao = await carteira.insereValorCarteira(idRestaurante, req.body.quantidadePratosDoados);

            if (resultadoIncersao.success) {

                var resultDoacao = {
                    "nomeDoador": req.body.nome,
                    "quantidadePratosDoados": req.body.quantidadePratosDoados,
                }

                //envia email com recompensa para cliente
                enviarEmailRecompensa(req.body.email);

                result = new Result(resultDoacao, true, "Prato doado com sucesso!", 200);
            } else {

                //em caso de erro em inserir valor da carteira o cliente doador é excluido se for novo, ou os pratos doados nessa docao são retirados do seu registro
                if (clienteNovo == true) {
                    await clienteDoadorSchema.updateOne({ _id: clienteDoador._id }, { $set: { totalPratosDoados: clienteAntigoBackup.totalPratosDoados } })
                }
                else {
                    await excluiDoador(clienteDoador._id);
                }

                //em caso de erro ao inserir valor na carteira doação é excluida
                await doacaoSchema.deleteOne({ _id: doacao._id });
                result = new Result(resultDoacao, false, "Doacao não efetuada, não foi possivel inserir valor na carteira!", 400);
                return result;
            }

        }
        else {
            result = new Result(resultDoacao, false, "Doacao não efetuada!", 400);
        }
        return result;

    } catch (error) {
        var result = new Result(error, false, "Internal error", 500);
        return result;
    }

}

async function efiCallback(body) {
    var doacao = await doacaoSchema.findOne({txid: body.txid});
    var doador = await clienteDoadorSchema.findOne({ _id: doacao.idClienteDoador });

    //insere valor carteira
    var resultadoIncersao = await carteira.insereValorCarteira(doacao.idRestaurante, doacao.quantidadePratosDoados);

    if (resultadoIncersao.success) {
        //envia email com recompensa para cliente
        enviarEmailRecompensa(doador.email, doacao.quantidadePratosDoados, doador.nome);

        result = new Result("Recebido", true, "Prato doado com sucesso!", 200);
        return result;
    }
}

async function enviarEmailRecompensa(emailcliente, quantidadePratosDoados, nome) {
    try {

        var remetente = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            service: "outlook",
            port: 587,
            secureConnection: false,
            tls: {
                ciphers: 'SSLv3'                            // tls version
            },
            auth: {
                user: "no-reply.cuco@outlook.com.br",
                pass: "Cuco1234"
            }
        });

        var emailASerEnviado = {

            from: "no-reply.cuco@outlook.com.br",

            to: emailcliente,

            subject: "Obrigado por Doar",

            text: "Olá " + nome + ", \n Este e-mail é para te confirmar que recebemos a doação de " + quantidadePratosDoados + " pratos. \n Queremos te agradecer por tornar o mundo um lugar melhor!"
        };


        remetente.sendMail(emailASerEnviado, function (error) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email enviado com sucesso.");
            }
        });

    } catch (error) {
        return error;
    }
}

//Ong
async function gerarTokenIndentificacaoRetiradaDoacoes(idCarteira) {
    try {
        var result;

        var entregaRetiradasDocument = await entregaRetiradasSchema.findOne({ idCarteira: idCarteira });
        if (entregaRetiradasDocument.tokenOng != "") {
            return new Result(entregaRetiradasDocument.tokenOng, true, "", 200);
        }
        //Gera token  de identificação
        var tokenIdentificacao = geraTokenIdentificacao();

        //Salva token para ser consultado na entrega pelo restaurante

        if (entregaRetiradasDocument) {
            await entregaRetiradasSchema.updateOne({ _id: entregaRetiradasDocument._id },
                { $set: { tokenOng: tokenIdentificacao } })

            var result = new Result(tokenIdentificacao, true, "Token de identificação para retirada de doações", 200);
        }
        else {
            var result = new Result(null, false, "Token de identificação não gerado", 400);
        }

        return result;

    } catch (error) {
        var result = new Result(error, false, "Internal error", 500);
        return result;
    }

}


//Estabelecimento
async function validacaoTokens(idCarteira, req) {
    try {
        var result;

        // var entregaRetiradasDocument = await entregaRetiradasSchema.findOne({ idCarteira: idCarteira });

        var validaToken = await entregaRetiradasSchema.findOne({ idCarteira: idCarteira, tokenOng: req.body.token });
        if (validaToken) {

            var resultadoHistoricoDeEntrega = await geraHistoricoEntregaRetirada(idCarteira);

            await entregaRetiradasSchema.updateOne({ _id: validaToken._id },
                { $set: { tokenOng: "" } })

            result = new Result(resultadoHistoricoDeEntrega, true, "Token Validado", 200);
        }
        else {
            result = new Result(null, false, "Token não Validado", 200);
        }
        return result;

    } catch (error) {
        var result = new Result(error, false, "Internal error", 500);
        return result;
    }

}



///--------------------------------------- Metodos Auxiliares --------------------------------

//Verifica se o cpf do cliente ja existe
const retornaClientePorCPF = async (cpf) => {

    var usuario = null;
    try {
        if (cpf) {
            usuario = await clienteDoadorSchema
                .findOne({ cpf: cpf });
            console.log(usuario)
        }
    } catch (error) {
        return usuario;
    }

    return usuario;
}

//Cria Cliente Doador
const criaClienteDoador = async (body) => {
    var clienteDoador = null;

    try {
        var clienteNew = {
            "nome": body.nome,
            "cpf": body.cpf,
            "email": body.email,
            "totalPratosDoados": body.quantidadePratosDoados
        };

        clienteDoador = await clienteDoadorSchema(clienteNew);
        console.log("cadastrei novo doador")

    } catch (error) {
        return clienteDoador;
    }
    return clienteDoador;
}

//Exclui Doador
const excluiDoador = async (idDoador) => {
    doadorResult = null;
    try {
        var doadorResult = await clienteDoadorSchema.deleteOne({ _id: idDoador });

    } catch (error) {
        return doadorResult;
    }
    return doadorResult;
}

//Exclui Doacao
const excluiDoacao = async (idDaoacao) => {
    try {
        var doacaoResult = await estabelecimentoSchema.deleteOne({ _id: idDaoacao });
        return doacaoResult;
    } catch (error) {
        return doacaoResult = null;
    }

}

//Gera o historico de entregas/retiradas de doações
async function geraHistoricoEntregaRetirada(idCarteira) {

    var resultadoHistoricoDeEntrega

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    var carteira = await carteiraSchema.findOne({ _id: idCarteira });
    var ong = await estabelecimentoSchema.findOne({ _id: carteira.idOng });
    var restaurante = await estabelecimentoSchema.findOne({ _id: carteira.idRestaurante });

    var historicoRestaurante = {
        "idCarteira": idCarteira,
        "dataEntregaRetirada": today.toLocaleDateString(),
        "valorEntregado": carteira.metaFinal,
        "nomeOng": ong.nomeEstabelecimento,
        "nomeRestaurante": restaurante.nomeEstabelecimento,
        "idOng": ong._id,
        "idRestaurante": restaurante._id,
        "quantidadePratosEntregues": carteira.entregasPendentes * carteira.metaFinal
    };

    var geraHistoricoEntregaRetirada = historicoEntregaRetiradasSchema(historicoRestaurante);
    resultadoHistoricoDeEntrega = await geraHistoricoEntregaRetirada.save();
    carteira.entregasPendentes = 0;
    await carteiraSchema.updateOne(carteira);
    return resultadoHistoricoDeEntrega;
}

//Cria clinte ou atualiza caso ja exista
async function criaOuAtualizaClienteDoador(body) {
    var clienteDoador;

    let clienteExistente = await retornaClientePorCPF(body.cpf);

    if (clienteExistente != null) {

        var valorTotaldeDoacoesDesseCliente = parseFloat(clienteExistente.totalPratosDoados) + parseFloat(body.quantidadePratosDoados);

        await clienteDoadorSchema.updateOne({ _id: clienteExistente._id }, { $set: { nome: body.nome, email: body.email, totalPratosDoados: valorTotaldeDoacoesDesseCliente } });
        clienteDoador = clienteExistente;
    }
    else {
        var clienteNew = {
            "nome": body.nome,
            "cpf": body.cpf,
            "email": body.email,
            "totalPratosDoados": body.quantidadePratosDoados
        };
        clienteDoador = clienteDoadorSchema(clienteNew);
    }
    return clienteDoador;
}

//Cria doação 
async function criaDoacao(body, clienteDoador, idRestaurante, cobranca) {
    var doacao = null;
    try {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        var doa = {
            "quantidadePratosDoados": body.quantidadePratosDoados,
            "dataDoacao": today.toLocaleDateString(),
            "idClienteDoador": clienteDoador._id.toString(),
            "idRestaurante": idRestaurante,
            "locId": cobranca.data.loc.id,
            "txId": cobranca.data.txid
        };
        console.log(doa);
        doacao = doacaoSchema(doa);
    } catch (error) {
        return doacao;
    }
    return doacao;
}

//Gera Token identificação para entrega de doações
function geraTokenIdentificacao() {
    var tokenIdentificacao = "";
    for (var i = 6; i > 0; --i) {
        tokenIdentificacao += (Math.floor(10 * Math.random())).toString();
    }
    return tokenIdentificacao;
}

module.exports = {
    gerarTokenIndentificacaoRetiradaDoacoes,
    /*gerarQRCodeLinkDoacao,*/ cadastraDoacao,
    validacaoTokens, enviarEmailRecompensa, efiCallback
}