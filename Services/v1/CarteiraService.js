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

async function insereValorCarteira (id_restaurante, valor){
   var carteira = await carteiraSchema.findOne({idRestaurante : id_restaurante});
   console.log(carteira);
   console.log(id_restaurante);
   var valorAtual = (parseFloat(carteira.valorAtual) + parseFloat(valor)).toString();
   return await carteiraSchema
   .updateOne({_id: carteira.id}, {$set:{valorAtual: valorAtual}});
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


module.exports = {editandoValorPrato, envioMetaCarteiraAtingido, inserirCarteira, 
                  listagemCarteiras, listagemCarteirasId, editandoCarteira, 
                  deletandoCarteira, insereValorCarteira}

 