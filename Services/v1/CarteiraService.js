let Result = require("../../Domain/Entities/Result");
let carteiraSchema = require('../../Domain/Models/v1/CarteiraModel');
let token = require("../../Services/v1/LoginService");
var nodemailer = require('nodemailer');
let estabelecimentoSchema = require('../../Domain/Models/v1/EstabelecimentoModel');
const CarteiraModel = require("../../Domain/Models/v1/CarteiraModel");

//Ong
async function  inserirCarteira(req) {
    try {

      var carteira = carteiraSchema(req.body);

      await carteira.save();
  
      var result = new Result(carteira, true, "Carteira inserida com sucesso!", 200);
      return result;

    } catch (error) {
      var result = new Result(null, false, "Internal error", 500);
      return result;
    }

}

async function listagemCarteiras() {
   try {

      var carteira = carteiraSchema(req.body);

      await carteira.save();
   
      var result = new Result(carteira, true, "Carteira inserida com sucesso!", 200);
      return result;
   
      var retorno = await carteiraSchema
               .find();
   
      var result = new Result(retorno, true, "lista de Carteiras", 200);
      return result;

   } catch (error) {
     var result = new Result(null, false, "Internal error", 500);
     return result;
   }
}

async function listagemCarteirasId(id) {
   try {
       
      var carteira = carteiraSchema(req.body);

      await carteira.save();
   
      var result = new Result(carteira, true, "Carteira inserida com sucesso!", 200);
      return result;   
      var retorno = await carteiraSchema
                .findById(id); 
    
      var result = new Result(retorno, true, "Carteira encontrada", 200);
      return result; 

   } catch (error) {
     var result = new Result(null, false, "Internal error", 500);
     return result;
   }
 
}

async function listagemEstabelecimentoId(id) {   
   try {
       
      var carteira = carteiraSchema(req.body);

      await carteira.save();
   
      var result = new Result(carteira, true, "Carteira inserida com sucesso!", 200);
      return result;
      var retorno = await estabelecimentoSchema.findById(id); 
    
      var result = new Result(retorno, true, "Lista de estabelecimentos", 200);
      return result;    

   } catch (error) {
     var result = new Result(null, false, "Internal error", 500);
     return result;
   }

}

async function editandoCarteira(id, req) {
   try {
       
      var carteira = carteiraSchema(req.body);

      await carteira.save();
   
      var result = new Result(carteira, true, "Carteira inserida com sucesso!", 200);
      return result;
      var retorno = await carteiraSchema
               .updateOne({_id: id}, {$set:{metaFinal: req.body.metaFinal, valorAtual: req.body.valorAtual, 
                  idRestaurante: req.body.idRestaurante, idOng: req.body.idOng, valorPrato: req.body.valorPrato}});
   
      var result = new Result(retorno, true, "Carteira editada com sucesso", 200);
      return result;

   } catch (error) {
     var result = new Result(null, false, "Internal error", 500);
     return result;
   }
}

async function insereValorCarteira (id, valor){
   try {

      var carteira = carteiraSchema(req.body);

      await carteira.save();
   
      var result = new Result(carteira, true, "Carteira inserida com sucesso!", 200);
      return result;
      var carteira = await carteiraSchema.findOne({_id : id});
   
      if(parseFloat(carteira.valorAtual) + parseFloat(valor) >= parseFloat(carteira.metaFinal))
      {
         envioMetaCarteiraAtingido(carteira);
         var valorAtual = (parseFloat(carteira.valorAtual) + parseFloat(valor) - parseFloat(carteira.metaFinal)).toString();
         var retorno = await carteiraSchema.updateOne({_id: carteira.id}, {$set:{valorAtual: valorAtual}});
   
         var result = new Result(retorno, true, "Valor inserido com sucesso, carteira teve seu limite atingido", 200);
         return result;
         //inserir entregas pendentes na tabela carteira 
      }
      else{
         var valorAtual = (parseFloat(carteira.valorAtual) + parseFloat(valor)).toString();
         var retorno = await carteiraSchema.updateOne({_id: carteira.id}, {$set:{valorAtual: valorAtual}});
         var result = new Result(retorno, true, "Valor inserido com sucesso", 200);
      }
       
   } catch (error) {
     var result = new Result(null, false, "Internal error", 500);
     return result;
   }
}

async function envioMetaCarteiraAtingido(carteira){
   try {

      var carteira = carteiraSchema(req.body);

      await carteira.save();
   
      var result = new Result(carteira, true, "Carteira inserida com sucesso!", 200);
      return result;
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

      var carteira = carteiraSchema(req.body);

      await carteira.save();
   
      var result = new Result(carteira, true, "Carteira inserida com sucesso!", 200);
      return result;
      var retorno = await carteiraSchema
               .deleteOne({_id: id});
      var result = new Result(retorno, true, "Carteira deletada com sucesso", 200);
      return result;

   } catch (error) {
     var result = new Result(null, false, "Internal error", 500);
     return result;
   }

}

async function editandoValorPrato(id, novoValor){
   try {

      var carteira = carteiraSchema(req.body);

      await carteira.save();
   
      var result = new Result(carteira, true, "Carteira inserida com sucesso!", 200);
      return result;
      var carteira = carteiraSchema();
      carteira = carteiraSchema.findById(id);
      carteira.valorPrato = novoValor;
   
      var retorno = await carteiraSchema
      .updateOne({_id: id}, {$set:{metaFinal: carteira.metaFinal, valorAtual: carteira.valorAtual, 
         idRestaurante: carteira.idRestaurante, idOng: carteira.idOng, valorPrato: carteira.valorPrato}});
      
      var result = new Result(retorno, true, "Valor do prato editado com sucesso", 200);
      return result;
   
       
   } catch (error) {
     var result = new Result(null, false, "Internal error", 500);
     return result;
   }

}


module.exports = {editandoValorPrato, inserirCarteira, 
                  listagemCarteiras, listagemCarteirasId, editandoCarteira, 
                  deletandoCarteira, insereValorCarteira}

 