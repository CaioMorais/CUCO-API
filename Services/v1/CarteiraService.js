let Result = require("../../Domain/Entities/Result");
let carteiraSchema = require('../../Domain/Models/v1/CarteiraModel');
let token = require("../../Services/v1/LoginService");
var nodemailer = require('nodemailer');
let estabelecimentoSchema = require('../../Domain/Models/v1/EstabelecimentoModel');
const CarteiraModel = require("../../Domain/Models/v1/CarteiraModel");
const { status } = require("express/lib/response");

//Ong
async function  inserirCarteira(req) {
    try {

      var carteira = carteiraSchema(req.body);

      await carteira.save();
  
      var result = new Result(carteira, true, "Carteira inserida com sucesso!", 200);
      return result;

    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }

}

async function listagemCarteiraIDRestaurante(id) {
   try {
      console.log(id)   
      var retorno = await carteiraSchema
               .find({idRestaurante : id, status : "true"});
   
      var result = new Result(retorno, true, "lista de Carteiras", 200);
      return result;

   } catch (error) {
     var result = new Result(error, false, "Internal error", 500);
     return result;
   }
}

async function listagemCarteiraIDOng(id) {
   try { 
      var retorno = await carteiraSchema
               .find({idOng : id, status : "true"});
   
      var result = new Result(retorno, true, "lista de Carteiras", 200);
      return result;

   } catch (error) {
     var result = new Result(error, false, "Internal error", 500);
     return result;
   }
}

async function listagemCarteiras() {
   try {
   
      var retorno = await carteiraSchema
               .find();
   
      var result = new Result(retorno, true, "lista de Carteiras", 200);
      return result;

   } catch (error) {
     var result = new Result(error, false, "Internal error", 500);
     return result;
   }
}

async function listagemCarteirasId(id) {
   try {
      var retorno = await carteiraSchema
                .findById(id); 
    
      var result = new Result(retorno, true, "Carteira encontrada", 200);
      return result; 

   } catch (error) {
     var result = new Result(error, false, "Internal error", 500);
     return result;
   }
 
}


async function listaValorPratoId(id) {
   try {
      var retorno = await carteiraSchema.findOne({idRestaurante: id}); 
      
      var result = new Result(retorno.valorPrato, true, "Valor encontrado", 200);
      return result; 

   } catch (error) {
     var result = new Result(error, false, "Internal error", 500);
     return result;
   }
 
}

async function listagemEstabelecimentoId(id) {   
   try {
      var retorno = await estabelecimentoSchema.findById(id); 
    
      var result = new Result(retorno, true, "Lista de estabelecimentos", 200);
      return result;    

   } catch (error) {
     var result = new Result(error, false, "Internal error", 500);
     return result;
   }

}

async function editandoCarteira(id, req) {
   try {
      var retorno = await carteiraSchema
               .updateOne({_id: id}, {$set:{metaFinal: req.body.metaFinal, valorAtual: req.body.valorAtual, 
                  idRestaurante: req.body.idRestaurante, idOng: req.body.idOng, valorPrato: req.body.valorPrato,
                  entregasPendentes: req.body.entregasPendentes}});
   
      var result = new Result(retorno, true, "Carteira editada com sucesso", 200);
      return result;

   } catch (error) {
     var result = new Result(error, false, "Internal error", 500);
     return result;
   }
}

async function insereValorCarteira (id, valor){
   try {
      var carteira = await carteiraSchema.findOne({idRestaurante : id});
   
      if(parseFloat(carteira.valorAtual) + parseFloat(valor) >= parseFloat(carteira.metaFinal))
      {
         envioMetaCarteiraAtingido(carteira);
         var valorAtual = (parseFloat(carteira.valorAtual) + parseFloat(valor) - parseFloat(carteira.metaFinal)).toString();
         var entregasPendentes = parseFloat(carteira.entregasPendentes) + 1;
         var retorno = await carteiraSchema.updateOne({_id: carteira.id}, {$set:{valorAtual: valorAtual, 
            entregasPendentes: entregasPendentes}});
         
         var result = new Result(retorno, true, "Valor inserido com sucesso, carteira teve seu limite atingido", 200);
         return result;
      }
      else{
         var valorAtual = (parseFloat(carteira.valorAtual) + parseFloat(valor)).toString();
         var retorno = await carteiraSchema.updateOne({_id: carteira.id}, {$set:{valorAtual: valorAtual}});
         var result = new Result(retorno, true, "Valor inserido com sucesso", 200);
         return result;
      }
       
   } catch (error) {
     var result = new Result(error, false, "Internal error", 500);
     return result;
   }
}


async function envioMetaCarteiraAtingido(carteira){
   try {
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
       
   } catch (error) {
     return error;
   }
}


async function deletandoCarteira(id) {
   try {

      var retorno = await carteiraSchema
               .deleteOne({_id: id});
      var result = new Result(retorno, true, "Carteira deletada com sucesso", 200);
      return result;

   } catch (error) {
     var result = new Result(error, false, "Internal error", 500);
     return result;
   }

}

async function editandoValorPrato(id, novoValor){
   try {

      var carteira = carteiraSchema();
      carteira = carteiraSchema.findById(id);
      carteira.valorPrato = novoValor;
   
      var retorno = await carteiraSchema
      .updateOne({_id: id}, {$set:{valorPrato: carteira.valorPrato}});
      
      var result = new Result(retorno, true, "Valor do prato editado com sucesso", 200);
      return result;
   
       
   } catch (error) {
     var result = new Result(error, false, "Internal error", 500);
     return result;
   }

}


module.exports = {listaValorPratoId, editandoValorPrato, inserirCarteira, 
                  listagemCarteiras, listagemCarteirasId, editandoCarteira, 
                  deletandoCarteira, insereValorCarteira, listagemCarteiraIDRestaurante, listagemCarteiraIDOng}

 