const bcrypt = require("bcryptjs");
let Result = require("../../Domain/Entities/Result");
let contaSchema = require('../../Domain/Models/v1/ContaModel');
let estabelecimentoSchema = require('../../Domain/Models/v1/EstabelecimentoModel');
var nodemailer = require('nodemailer');
var ejs = require('ejs');


//#region Metodos Principais
async function cadastrarConta(req) {
    try {
        var result;
        //Verificação a ja exixtencia dos dados 
        var verif = await verificaExistenciaDosDados(req.body)
        if (verif[0] == true) {
            result = new Result(null, false, verif[1], 400);
            return result;
        }
        else {
            //Salvando estbelecimento
            var estabelecimento = await cadastraOngOuEstabelecimento(req.body);

            //Salvando usuario com id do estabelecimento
            if (estabelecimento != null) {
                var conta = await cadastraUsuarioComIDEstabelecimentoOuOng(req.body, estabelecimento._id);

                if (conta =! null) {
                    var contaResult = {
                        "nome": conta.nome,
                        "email": conta.email,
                        "tipoConta": conta.tipoConta,
                        "nomeEstabelecimento": estabelecimento.nomeEstabelecimento
                    }
        
                    result = new Result(contaResult, true, "Cadastro realizado com sucesso!", 200);
                    return result;
                }
                else{
                    result = new Result(contaResult, true, "Falha no cadastro da conta!", 200);
                    return result;
                }
            }
            else{
                result = new Result(contaResult, true, "Falha no cadastro do estabelecimento!", 200);
                return result;
            }
        }

    } catch (error) {
        var result = new Result(error, false, "Internal error", 500);
        return result;
    }
}

async function editarConta(idConta, req) {
    console.log("editarConta");
    try {
        var result;
        //Verificação a ja exixtencia dos dados  
        var contaAntesEditar = await listaContaCompletaPorID(idConta)
        if (contaAntesEditar.cpf != req.body.cpf) {
            let dadoCPF = await verificaCPF(req.body.cpf);
            if (dadoCPF) {
                result = new Result('', false, "Edição não Efetuado, CPF ja utilizado", 400);
                return result;
            }
        }
        
        if (contaAntesEditar.cnpj != req.body.cnpj) {
            let dadoCNPJ = await verificaCNPJ(req.body.cnpj);
            if (dadoCNPJ) {
                result = new Result('', false, "Edição não Efetuado, CNPJ ja utilizado", 400);
                return result;
            }
        }

        var contaAtual = await listaContaID(idConta);
        var estabelecimentoAtual = await listaOngOuEstabelecimentoPorID(contaAtual.idEstabelecimento);
        var vetorResult = [];

        //Atualiza Estabelecimento
        var estabelecimentoAtualizado = await atualizaOngOuEstabelecimento(req.body, contaAtual.idEstabelecimento);

        if (estabelecimentoAtualizado != null) {
            //Atualiza Conta 
            var contaAtualizada = await atualizaDadosConta(req.body, idConta, estabelecimentoAtual);
        }
        else {
            result = new Result('', false, "Alterações não realizadas", 400);
            return result;
        }

        if (contaAtualizada != null) {
            vetorResult.push(contaAtualizada, estabelecimentoAtualizado);
            result = new Result(vetorResult, true, "Conta alterada com sucesso!", 200);
        }
        else {
            result = new Result('', false, "Alterações não realizadas", 400);
        }
        return result;


    } catch (error) {
        var result = new Result(error, false, "Internal error", 500);
        return result;
    }

}

async function excluirConta(idConta) {
    try {

        var contaAtual = await listaContaID(idConta);
        console.log(contaAtual);
        if (contaAtual == null) {
            var result = new Result(null, false, "Exclusão falhou, conta inexistente", 400);
        }
        else {
            var estabelecimentoAtual = await listaOngOuEstabelecimentoPorID(contaAtual.idEstabelecimento);
            var vetorResult = [];

            //Exclui Estabelcimento
            var estabelecimentoExcluido = await excluiOngOuEstabelecimento(contaAtual.idEstabelecimento);
            if (estabelecimentoExcluido != null) {
                //Exclui Conta
                var contaExcluida = await excluiConta(idConta, estabelecimentoAtual);
            } else {
                var result = new Result(null, false, "Exclusão falhou", 400);
                return result;
            }

            if (contaExcluida != null) {
                vetorResult.push(contaExcluida, estabelecimentoExcluido);
                var result = new Result(vetorResult, true, "Conta excluida com sucesso", 200);
            }
            else {
                var result = new Result(null, false, "Exclusão falhou", 400);
            }
        }

        return result;

    } catch (error) {
        var result = new Result(error, false, "Internal error", 500);
        return result;
    }
}


async function pegarDadosConta(idConta) {
    try {
        var contaCompleta = await listaContaCompletaPorID(idConta)

        var result = new Result(contaCompleta, true, "Dados da conta", 200);
        return result;

    } catch (error) {
        console.log(error)
        var result = new Result(error, false, "Internal error", 500);
        return result;
    }

}

async function pegarDadosApenasEstabelecimentoOuOng(idEstabelecimento) {
    try {
        var estabelecimento = await retornaDadosOngOuEstabelecimentoPorID(idEstabelecimento)

        var result = new Result(estabelecimento, true, "Dados da Ong ou Estabelecimento", 200);
        return result;

    } catch (error) {
        console.log(error)
        var result = new Result(error, false, "Internal error", 500);
        return result;
    }

}

async function verificaExisteciaEmail(email) {
    try {
        var result;
        let dadoEmail = await verificaEmailExiste(email);
        if (dadoEmail) {
            message = "E-mail ja utilizado";
            result = new Result(null, true, message, 200);
        }
        else{
            message = "E-mail não encontrado";
            result = new Result(null, false, message, 200);
        }
        return result;

    } catch (error) {
        var result = new Result(error, false, "Internal error", 500);
        return result;
    }

}

async function resetarSenha(idConta, req) {
    try {
        var hash = await bcrypt.hash(req.body.senha, 10)
        var resultado = await contaSchema.updateOne({ _id: idConta }, { $set: { senha: hash } });
        var result;

        if (resultado.acknowledged) result = new Result(resultado, true, "senha atualizada sucesso", 200);
        else result = new Result(resultado, false, "senha não atualizada", 400);

        return result;

    } catch (error) {
        var result = new Result(error, false, "Internal error", 500);
        return result;
    }

}

async function enviaEmailResetSenha(email) {
    try {
        var conta = await verificaEmailExiste(email);
        if (!conta) {
            var result = new Result(null, false, "Email não enviado, conta inexistente", 400);
            return result;
        }

        var emailEnvio = "no-reply.cuco@outlook.com.br";
        var senha = "CucoProjeto1@";
        var emailDestino = email;
        var idConta = conta._id;
        var assunto = "Troca de Senha Cuco";
        var service = "outlook";
        var caminhoHtml = "/helperService/TemplateEmailTrocaSenha.ejs";

        ejs.renderFile(__dirname + caminhoHtml, {email: emailDestino, id: idConta}, function (err, data) 
        {
            if (err) {
                console.log(err);
            } else {
                var transporter = nodemailer.createTransport({
                    host: "smtp-mail.outlook.com",
                    service: service,
                    port: 587,
                    secureConnection: false,
                    tls: {
                        ciphers: 'SSLv3'                            // tls version
                    },
                    auth: {
                        user: emailEnvio,
                        pass: senha
                    }
                });
     
                var mainOptions = {
                    from: emailEnvio,
                    to: emailDestino,
                    subject: assunto,
                    html: data
                };
    
                transporter.sendMail(mainOptions, function (err, info) {
                    if (err) {
                        var result = new Result(null, false, "Falha ao enviar o Email, por favor tente novamente mais tarde", 400);
                        return result;
                    } else {
                        console.log("Email enviado com sucesso.");
                        result = true;
                    }
                });
            }
        })
        
        var result = new Result(null, true, "Um email com link para trocar sua senha foi enviado para sua conta!", 200);
        return result;

    } catch (error) {
        var result = new Result(error, false, "Internal error", 500);
        return result;
    }

}

async function listaContasPendentes() {
    try {
        var contas = await contaSchema.find({ verificaAtivo: "0" })
        return new Result(contas, true, "", 200);
    }
    catch (error) {
        return new Result(error, false, "Internal error", 500)
    }
}

async function aprovaOuNegaContas(req) {
    try{
        var conta = await contaSchema.findOne({ _id: req.params.idEstabelecimento })
        conta.verificaAtivo = req.body.verificaAtivo;
        var resultado = await contaSchema.updateOne({ _id: req.params.idEstabelecimento }, {
            $set: {
                verificaAtivo: conta.verificaAtivo
            }
        });
        if(resultado.acknowledged){
            if(req.body.verificaAtivo == 1){
                return new Result(true, true, "Aprovado com sucesso!", 200)
            }
            else if(req.body.verificaAtivo == 2){
                return new Result(true, true, "Negado com sucesso!", 200)
            }
            
        }
    }
    catch(error){
        return new Result(error, false, "Internal error", 500)
    }
    
}
//#endregion

//#region Metodos Auxiliares 

///Verifica se o E-mail existe
const verificaEmailExiste = async (email) => {

    let usuario = null;
    if (email) {
        usuario = await contaSchema
            .findOne({ email: email });
    }
    return usuario;
}

///Verifica se a CPF existe
const verificaCPF = async (cpf) => {
    let usuario = null;
    if (cpf) {
        usuario = await contaSchema
            .findOne({ cpf: cpf });
    }
    return usuario;
}

///Verifica se a CNPJ existe
const verificaCNPJ = async (cnpj) => {
    let estabelecimento = null;
    if (cnpj) {
        estabelecimento = await estabelecimentoSchema
            .findOne({ cnpj: cnpj });
    }
    return estabelecimento;
}

///Centraliza se a verificação da já existencias dos dados da nova conta no banco
const verificaExistenciaDosDados = async (body) => {

    var message = null;

    let dadoEmail = await verificaEmailExiste(body.email);
    if (dadoEmail) {
        message = "Cadastro não Efetuado, E-mail ja utilizado";
        return [true, message];
    }

    let dadoCPF = await verificaCPF(body.cpf);
    if (dadoCPF) {
        message = "Cadastro não Efetuado, CPF ja utilizado";
        return [true, message];
    }

    let dadoCNPJ = await verificaCNPJ(body.cnpj);
    if (dadoCNPJ) {
        message = "Cadastro não Efetuado, CNPJ ja utilizado";
        return [true, message];
    }

    return [false, message];
}

//Cadastra Estabelcimento ONG/Restaurante
const cadastraOngOuEstabelecimento = async (body) => {
    try {
        var estabelecimento = estabelecimentoSchema(body);
        await estabelecimento.save();
        console.log(estabelecimento);
        return estabelecimento;
    } catch (error) {
        console.log(error)
        return estabelecimento = null;
    }
}

//Cadastra Conta relacionando com Estabelecimento
const cadastraUsuarioComIDEstabelecimentoOuOng = async (body, estabelecimento_id) => {
    try {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);

        var hash = await bcrypt.hash(body.senha, 10);

        var cont = {
            "nome": body.nome,
            "sobrenome": body.sobrenome,
            "cpf": body.cpf,
            "email": body.email,
            "senha": hash,
            "tipoConta": body.tipoConta,
            "idEstabelecimento": estabelecimento_id,
            "verificaAtivo": null,
            "dataCadastro": today.toLocaleDateString('pt-br')
        }
        console.log(cont);
        var conta = contaSchema(cont);
        await conta.save();
        return cont;

    } catch (error) {
        await excluiOngOuEstabelecimento(estabelecimento_id);
        return null;
    }
}

//Atualiza Estabelecimento/ONG
const atualizaOngOuEstabelecimento = async (body, idEstabelecimento) => {
    try {

        var estabelecimento_ong = await listaOngOuEstabelecimentoPorID(idEstabelecimento);

        var nomeEstabelecimento = body.nomeEstabelecimento == null ? estabelecimento_ong.nomeEstabelecimento : body.nomeEstabelecimento;
        var razaoSocial = body.razaoSocial == null ? estabelecimento_ong.razaoSocial : body.razaoSocial;
        var tipo = body.tipo == null ? estabelecimento_ong.tipo : body.tipo;
        var cnpj = body.cnpj == null ? estabelecimento_ong.cnpj : body.cnpj;
        var anexoDocumento1 = body.anexoDocumento1 == null ? estabelecimento_ong.anexoDocumento1 : body.anexoDocumento1;
        var anexoDocumento2 = body.anexoDocumento2 == null ? estabelecimento_ong.anexoDocumento2 : body.anexoDocumento2;
        var anexoComprovanteCNPJ = body.anexoComprovanteCNPJ == null ? estabelecimento_ong.canexoComprovanteCNPJ : body.anexoComprovanteCNPJ;
        var anexoComprovanteEndereco = body.anexoComprovanteEndereco == null ? estabelecimento_ong.anexoComprovanteEndereco : body.anexoComprovanteEndereco;
        var cep = body.cep == null ? estabelecimento_ong.cep : body.cep;
        var cidade = body.cidade == null ? estabelecimento_ong.cidade : body.cidade;
        var estado = body.estado == null ? estabelecimento_ong.estado : body.estado;
        var bairro = body.bairro == null ? estabelecimento_ong.bairro : body.bairro;
        var logradouro = body.logradouro == null ? estabelecimento_ong.logradouro : body.logradouro;
        var numero = body.numero == null ? estabelecimento_ong.numero : body.numero;
        var complemento = body.complemento == null ? estabelecimento_ong.complemento : body.complemento;
        var emailEstabelecimento = body.emailEstabelecimento == null ? estabelecimento_ong.emailEstabelecimento : body.emailEstabelecimento;
        var telefone = body.telefone == null ? estabelecimento_ong.telefone : body.telefone;
        var chavePix = body.chavePix == null ? estabelecimento_ong.chavePix : body.chavePix;
        var tipoChavePix = body.tipoChavePix == null ? estabelecimento_ong.tipoChavePix : body.tipoChavePix;
        var fotoPerfil = body.fotoPerfil == null ? estabelecimento_ong.fotoPerfil : body.fotoPerfil;
        var descricao = body.descricao == null ? estabelecimento_ong.descricao : body.descricao;
        var paginaWeb = body.paginaWeb == null ? estabelecimento_ong.paginaWeb : body.paginaWeb;

        var estabelecimentoResult = await estabelecimentoSchema
            .updateOne({ _id: idEstabelecimento }, {
                $set: {
                    nomeEstabelecimento: nomeEstabelecimento,
                    razaoSocial: razaoSocial, tipo: tipo, cnpj: cnpj,
                    anexoDocumento1: anexoDocumento1, anexoDocumento2: anexoDocumento2,
                    anexoComprovanteCNPJ: anexoComprovanteCNPJ, anexoComprovanteEndereco: anexoComprovanteEndereco,
                    cep: cep, cidade: cidade, estado: estado, bairro: bairro,
                    logradouro: logradouro, numero: numero, complemento: complemento,
                    emailEstabelecimento: emailEstabelecimento, telefone: telefone,
                    chavePix: chavePix, tipoChavePix: tipoChavePix, fotoPerfil: fotoPerfil,
                    descricao: descricao, paginaWeb: paginaWeb
                }

            });

        return estabelecimentoResult;
    } catch (error) {
        return estabelecimentoResult = null;
    }
}

//Atualiza DadosConta
const atualizaDadosConta = async (body, idConta, estabelecimentoAtual) => {
    try {
        var conta = await listaContaID(idConta);

        var nome = body.nome == null ? conta.nome : body.nome;
        var sobrenome = body.sobrenome == null ? conta.sobrenome : body.sobrenome;
        var cpf = body.cpf == null ? conta.cpf : body.cpf;
        var email = body.email == null ? conta.email : body.email;
        var tipoConta = body.tipoConta == null ? conta.tipoConta : body.tipoConta;
        var idEstabelecimento = body.idEstabelecimento == null ? conta.idEstabelecimento : body.idEstabelecimento;
        var verificaAtivo = body.verificaAtivo == null ? conta.verificaAtivo : body.verificaAtivo;
        var dataCadastro = body.dataCadastro == null ? conta.dataCadastro : body.dataCadastro;
        var senha = conta.senha;

        var contaResult = await contaSchema
            .updateOne({ _id: idConta }, {
                $set: {
                    nome: nome, sobrenome: sobrenome, cpf: cpf,
                    email: email, senha: senha,
                    tipoConta: tipoConta, idEstabelecimento: idEstabelecimento,
                    verificaAtivo: verificaAtivo, dataCadastro: dataCadastro
                }
            });

        return contaResult;
    } catch (error) {
        await atualizaOngOuEstabelecimento(estabelecimentoAtual, estabelecimentoAtual._id);
        return contaResult = null;
    }

}

//Exclui Conta Usuario 
const excluiConta = async (idConta, estabelecimentoAtual) => {
    try {
        var contaResult = await contaSchema.deleteOne({ _id: idConta });
        return contaResult;

    } catch (error) {
        await cadastraOngOuEstabelecimento(estabelecimentoAtual); //recadadastra o estabelecimento
        return contaResult = null;
    }

}

//Exclui Estabelecimento/Ong
const excluiOngOuEstabelecimento = async (idEstabelecimento) => {
    try {
        var estabelecimentoResult = await estabelecimentoSchema.deleteOne({ _id: idEstabelecimento });
        return estabelecimentoResult;
    } catch (error) {
        return estabelecimentoResult = null;
    }

}

//Lista Contas
const listaContas = async () => {
    return await carteiraSchema.find();
}

//Lista conta + estabelecimento por ID
const listaContaCompletaPorID = async (id) => {
    console.log("entrou")
    var conta = await listaContaID(id);
    var estabelecimento = await listaOngOuEstabelecimentoPorID(conta.idEstabelecimento)
    console.log(conta)
    var retorno = {
        "nome": conta.nome,
        "sobrenome": conta.sobrenome,
        "cpf": conta.cpf,
        "email": conta.email,
        "tipoConta": conta.tipoConta,
        "idEstabelecimento": conta.idEstabelecimento,
        "verificaAtivo": conta.verificaAtivo,
        "dataCadastro": conta.dataCadastro,
        "nomeEstabelecimento": estabelecimento.nomeEstabelecimento,
        "razaoSocial": estabelecimento.razaoSocial,
        "tipo": estabelecimento.tipo,
        "cnpj": estabelecimento.cnpj,
        "anexoDocumento1": estabelecimento.anexoDocumento1,
        "anexoDocumento2": estabelecimento.anexoDocumento2,
        "anexoComprovanteCNPJ": estabelecimento.canexoComprovanteCNPJ,
        "anexoComprovanteEndereco": estabelecimento.anexoComprovanteEndereco,
        "cep": estabelecimento.cep,
        "cidade": estabelecimento.cidade,
        "estado": estabelecimento.estado,
        "bairro": estabelecimento.bairro,
        "logradouro": estabelecimento.logradouro,
        "numero": estabelecimento.numero,
        "complemento": estabelecimento.complemento,
        "emailEstabelecimento": estabelecimento.emailEstabelecimento,
        "telefone": estabelecimento.telefone,
        "chavePix": estabelecimento.chavePix,
        "tipoChavePix": estabelecimento.tipoChavePix,
        "fotoPerfil": estabelecimento.fotoPerfil,
        "descricao": estabelecimento.descricao,
        "paginaWeb": estabelecimento.paginaWeb,
    }

    return retorno;
}

//Lista conta por ID
const listaContaID = async (id) => {
    var conta = await contaSchema
        .findById(id);

    var retorno = {
        "nome": conta.nome,
        "sobrenome": conta.sobrenome,
        "cpf": conta.cpf,
        "email": conta.email,
        "tipoConta": conta.tipoConta,
        "idEstabelecimento": conta.idEstabelecimento,
        "verificaAtivo": conta.verificaAtivo,
        "dataCadastro": conta.dataCadastro
    }

    return retorno;
}

//Lista estabelecimento por ID
const listaOngOuEstabelecimentoPorID = async (id) => {
    return await estabelecimentoSchema
        .findById(id);
}

//retorna dados limitados de estabelecimento por ID
const retornaDadosOngOuEstabelecimentoPorID = async (id) => {
    var estabelecimento =  await estabelecimentoSchema.findById(id);

    var retorno = {
        "nomeEstabelecimento": estabelecimento.nomeEstabelecimento,
        "tipo": estabelecimento.tipo,
        "cep": estabelecimento.cep,
        "cidade": estabelecimento.cidade,
        "estado": estabelecimento.estado,
        "bairro": estabelecimento.bairro,
        "logradouro": estabelecimento.logradouro,
        "numero": estabelecimento.numero,
        "complemento": estabelecimento.complemento,
        "chavePix": estabelecimento.chavePix,
        "descricao": estabelecimento.descricao,
        "paginaWeb": estabelecimento.paginaWeb,
    }

    return retorno;


}
//#endregion

module.exports = {
    cadastrarConta, editarConta, excluirConta, resetarSenha, enviaEmailResetSenha, pegarDadosConta, 
    aprovaOuNegaContas, listaContasPendentes, verificaExisteciaEmail, pegarDadosApenasEstabelecimentoOuOng
}