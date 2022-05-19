let Result = require("../../Domain/Entities/Result");
let carteiraSchema = require('../../Domain/Models/v1/CarteiraModel');
var mongoose = require('mongoose');
let token = require("../../Services/v1/LoginService");
var nodemailer = require('nodemailer');
let estabelecimentoSchema = require('../../Domain/Models/v1/EstabelecimentoModel');
const CarteiraModel = require("../../Domain/Models/v1/CarteiraModel");
//Ong
async function  inserirCarteira(req) {
    
    var result = new Result
    var carteira = carteiraSchema(req.body);

    await carteira.save();
     
    result.content = carteira;
    result.message = "Carteira inserida com sucesso!";
    result.success = true;
    return result;
}

async function listagemCarteiras() {
    
   return await carteiraSchema
            .find();   
}

async function listagemCarteirasId(id) {   
    return await carteiraSchema
             .findById(id);   
}

async function listagemEstabelecimentoId(id) {   
   return await estabelecimentoSchema.findById(id);   
}

async function editandoCarteira(id, req) {

   return await carteiraSchema
            .updateOne({_id: id}, {$set:{metaFinal: req.body.metaFinal, valorAtual: req.body.valorAtual, 
               idRestaurante: req.body.idRestaurante, idOng: req.body.idOng, valorPrato: req.body.valorPrato}});
}

async function insereValorCarteira (id, valor){

   var carteira = await carteiraSchema.findOne({_id : id});

   if(parseFloat(carteira.valorAtual) + parseFloat(valor) >= parseFloat(carteira.metaFinal))
   {
      envioMetaCarteiraAtingido(carteira);
      var valorAtual = (parseFloat(carteira.valorAtual) + parseFloat(valor) - parseFloat(carteira.metaFinal)).toString();
      return await carteiraSchema.updateOne({_id: carteira.id}, {$set:{valorAtual: valorAtual}});
   }
   else{
      var valorAtual = (parseFloat(carteira.valorAtual) + parseFloat(valor)).toString();
      return await carteiraSchema.updateOne({_id: carteira.id}, {$set:{valorAtual: valorAtual}});
   }
}

async function envioMetaCarteiraAtingido(carteira){
   var dadosEstabelecimento = await listagemEstabelecimentoId(carteira.idRestaurante);

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
      
      to: dadosEstabelecimento.emailEstabelecimento,
      
      subject: "Limite de Carteira Atingido! - " + dadosEstabelecimento.nomeEstabelecimento,
      
      text: "Prezado usuário, o limite da carteira no valor de R$"+ carteira.metaFinal +
      " referente ao estabelecimento "+  dadosEstabelecimento.nomeEstabelecimento + " foi atingido!"
      + " Favor entrar em contato com o mesmo através do n° " + dadosEstabelecimento.contato + " para agendar a coleta."      
      };


      remetente.sendMail(emailASerEnviado, function(error){
         if (error) {
            console.log(error);
         } else {
            console.log("Email enviado com sucesso.");
         }
         });


}


async function deletandoCarteira(id) {
   return await carteiraSchema
            .deleteOne({_id: id});
}

async function editandoValorPrato(id, novoValor){

   var carteira = carteiraSchema();
   carteira = carteiraSchema.findById(id);
   carteira.valorPrato = novoValor;

   return await carteiraSchema
   .updateOne({_id: id}, {$set:{metaFinal: carteira.metaFinal, valorAtual: carteira.valorAtual, 
      idRestaurante: carteira.idRestaurante, idOng: carteira.idOng, valorPrato: carteira.valorPrato}});

}


module.exports = {editandoValorPrato, envioMetaCarteiraAtingido, inserirCarteira, 
                  listagemCarteiras, listagemCarteirasId, editandoCarteira, 
                  deletandoCarteira, insereValorCarteira}

 