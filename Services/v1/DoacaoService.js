let Result = require("../../Domain/Entities/Result");
let doacaoSchema = require('../../Domain/Models/v1/DoacaoModel');
let clienteDoadorSchema = require('../../Domain/Models/v1/ClienteDoadorModel');
let carteira = require('../../Services/v1/CarteiraService');
let entregaRetiradasSchema = require('../../Domain/Models/v1/EntregaRetiradaModel');
let historicoEntregaRetiradasSchema = require("../../Domain/Models/v1/HistoricoEntregaRetiradas");
let carteiraSchema = require("../../Domain/Models/v1/CarteiraModel");
let estabelecimentoSchema = require("../../Domain/Models/v1/EstabelecimentoModel");
var nodemailer = require('nodemailer');

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

async function cadastraDoacao(req, idRestaurante){
    try {
        var result;

        //Verifica se o cliente ja existe e cria ou atualiza    
        var clienteDoador = await criaOuAtualizaClienteDoador(); 

        //Cria Doação
        var doacao = await criaDoacao();

        //salva cliente e doação, em caso de sucesso insere valor na carteira
        if (await clienteDoador.save()) {
            if (await doacao.save()) {
                //insere valor carteira
                await carteira.insereValorCarteira(idRestaurante, req.body.valorDoacao);

                var resultDoacao = {
                    "nomeDoador" : req.body.nome,
                    "valor": req.body.valorDoacao,
                }
                
                //envia email com recompensa para cliente
                enviarEmailRecompensa(req.body.email);
        
                result = new Result(resultDoacao, true, "Doacao inserida com sucesso!", 200);
            }
            else{
                excluiDoador(clienteDoador._id)
                result = new Result(resultDoacao, false, "Doacao não efetuada!", 400);
            }
        }
        return result;

    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }

}

async function enviarEmailRecompensa(emailcliente){
    try {

        var remetente = nodemailer.createTransport( {
            host: "smtp-mail.outlook.com",
            service: "outlook",
            port: 587,
            secureConnection: false,
            tls: {
              ciphers: 'SSLv3'                            // tls version
            },
            auth: {
               user:"no-reply.cuco@outlook.com.br",
               pass:"Cuco1234"
            }
         });
      
         var emailASerEnviado = {
      
            from: "no-reply.cuco@outlook.com.br",
            
            to: emailcliente,
            
            subject: "Obrigado por Doar",
            
            text: "Sua doação ajudara uma pessoa com fome, por esse motivo a equipe do CUCO"+ 
            "em conjunto com o estabelecimento te fornecera um NFC esclusivo, que pode ser resgatado"
            + " pelo link a seguir:  www.nfcexclusivoscucodoadores.com"     
         };
      
      
         remetente.sendMail(emailASerEnviado, function(error){
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
async function gerarTokenIndentificacaoRetiradaDoacoes(idCarteira){
    try {
        var result;

        //Gera token  de identificação
        var tokenIdentificacao = geraTokenIdentificacao();
        
        //Salva token para ser consultado na entrega pelo restaurante
        var entregaRetiradasDocument = await entregaRetiradasSchema.findOne({idCarteira: idCarteira});
        if (entregaRetiradasDocument) {
            await entregaRetiradasSchema.updateOne({_id: entregaRetiradasDocument._id},
                {$set:{tokenOng: tokenIdentificacao}})
            
            var result = new Result(tokenIdentificacao, true, "Token de identificação para retirada de doações", 200);
        }
        else{
            var result = new Result(null, false, "Token de identificação não gerado", 400);
        }
        
        return result;
       
    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }

} 


//Estabelecimento
async function validacaoTokens(idCarteira, req){
    try {
        var result;

        var entregaRetiradasDocument = await entregaRetiradasSchema.findOne({idCarteira: idCarteira});
        
        var validaToken = await entregaRetiradasDocument.findOne({idCarteira: idCarteira, tokenOng: req.body.token});
    
        if(validaToken){
            
            var  resultadoHistoricoDeEntrega = await geraHistoricoEntregaRetirada(idCarteira);

            await entregaRetiradasSchema.updateOne({_id: entregaRetiradasDocument._id},
                {$set:{tokenOng: ""}})

            result = new Result(resultadoHistoricoDeEntrega, true, "Token Validado", 200);
        }
        else{
            result = new Result(resultado, false, "Token não Validado", 400);   
        }
        return result;
            
    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }
    
}



///--------------------------------------- Metodos Auxiliares --------------------------------

//Verifica se o cpf do cliente ja existe
const verificaCpfCliente = async (cpf) =>{
    
    let usuario = null;   
    if (cpf) {
        usuario = await clienteDoadorSchema
                   .findOne({cpf: cpf});
    }
    return usuario;
}

//Exclui Doador
const excluiDoador = async (idDoador) =>{
    try {       
        var doadorResult = await clienteDoadorSchema.deleteOne({_id: idDoador});
        return doadorResult;
    } catch (error) {
        return doadorResult = null;
    }

}

//Exclui Doacao
const excluiDoacao = async (idDaoacao) =>{
    try {       
        var doacaoResult = await estabelecimentoSchema.deleteOne({_id: idDaoacao});
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
    var ong = await estabelecimentoSchema.findOne({ _id: ctr.idOng });
    var restaurante = await estabelecimentoSchema.findOne({ _id: ctr.idRestaurante });

    var historico = {
        "idCarteira": idCarteira,
        "dataEntregaRetirada": today.toLocaleDateString(),
        "valorEntregado": carteira.metaFinal,
        "nomeOng": ong.nomeEstabelecimento,
        "nomeRestaurante": restaurante.nomeEstabelecimento,
        "idOng": ong._id,
        "idRestaurante": rest._id
    };

    var geraHistoricoEntregaRetirada = historicoEntregaRetiradasSchema(historico);
    resultadoHistoricoDeEntrega = await geraHistoricoEntregaRetirada.save();
    return resultadoHistoricoDeEntrega;
}

//Cria clinte ou atualiza caso ja exista
async function criaOuAtualizaClienteDoador() {
    var clienteDoador;

    let clienteExistente = await verificaCpfCliente(req.body.cpf);

    if (clienteExistente) {
        await clienteDoadorSchema.updateOne({ _id: clienteExistente._id }, { $set: { nome: req.body.nome, email: req.body.email } });
        clienteDoador = clienteExistente;
    }
    else {
        clienteDoador = clienteDoadorSchema(req.body);
    }
    return clienteDoador;
}

//Cria doação 
async function criaDoacao() {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    var doa = {
        "valorDoacao": req.body.valorDoacao,
        "dataDoacao": today.toLocaleDateString(),
        "idClienteDoador": clienteDoador._id,
        "idRestaurante": idRestaurante
    };
    console.log(doa);
    var doacao = doacaoSchema(doa);
    return doacao;
}

//Gera Token identificação para entrega de doações
function geraTokenIdentificacao() {
    var tokenIdentificacao;
    for (var i = 80; i > 0; --i) {
        tokenIdentificacao += (Math.floor(Math.random() * 256)).toString(16);
    }
    return tokenIdentificacao;
}

module.exports = {
    gerarTokenIndentificacaoRetiradaDoacoes,
    /*gerarQRCodeLinkDoacao,*/ cadastraDoacao,
    validacaoTokens, enviarEmailRecompensa
}