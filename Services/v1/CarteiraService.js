let Result = require("../../Domain/Entities/Result");
let carteiraSchema = require('../../Domain/Models/v1/CarteiraModel');

//Ong
function envioMetaCarteiraAtingido(){

}

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

 async function editandoCarteira(id, req) {

    return await carteiraSchema
             .updateOne({_id: id}, {$set:{metaFinal: req.body.metaFinal, valorAtual: req.body.valorAtual, 
               idRestaurante: req.body.idRestaurante, idOng: req.body.idOng, valorPrato: req.body.valorPrato}});
 }

 async function deletandoCarteira(id) {
    return await carteiraSchema
             .remove({_id: id});
 }

 async function editandoValorPrato(id, novoValor){

   var carteira = carteiraSchema();
   carteira = carteiraSchema.findById(id);

   carteira.valorPrato = novoValor;

   return await carteiraSchema
   .updateOne({_id: id}, {$set:{metaFinal: carteira.metaFinal, valorAtual: carteira.valorAtual, 
      idRestaurante: carteira.idRestaurante, idOng: carteira.idOng, valorPrato: carteira.valorPrato}});

 }


 async function incrementandoSaldo(id, req){

   var carteira = carteiraSchema();
   carteira = carteiraSchema.findById(id);

   var valorFloat = parseFloat(req.body.valor);


   return await carteiraSchema
   .updateOne({_id: id}, {$set:{metaFinal: carteira.metaFinal, valorAtual: JSON.parse(valorFloat + parseFloat(carteira.valorAtual)), 
      idRestaurante: carteira.idRestaurante, ong_IdOng: carteira.ong_IdOng, valorPrato: carteira.valorPrato}});

 }


 

module.exports = {incrementandoSaldo, editandoValorPrato, envioMetaCarteiraAtingido, inserirCarteira, listagemCarteiras, listagemCarteirasId, editandoCarteira, deletandoCarteira}
 