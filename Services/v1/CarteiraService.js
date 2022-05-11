const mongoose = require('mongoose');
var uri = "mongodb+srv://admin:admin123@cluster0.kxyqc.mongodb.net/cucoprod?retryWrites=true&w=majority";
mongoose.connect(uri);

const connection = require("../../Infrastructure/Data/connection");

let Result = require("../../Domain/Entities/Result");
//const res = require('express/lib/response');
let CarteiraModel = require('../../Models/v1/CarteiraModel');
let carteiraSchema = require('../../Models/v1/CarteiraModel');


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
               idRestaurante: req.body.idRestaurante, ong_IdOng: req.body.ong_IdOng, valorPrato: req.body.valorPrato}});
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
      idRestaurante: carteira.idRestaurante, ong_IdOng: carteira.ong_IdOng, valorPrato: carteira.valorPrato}});

 }

module.exports = {editandoValorPrato, envioMetaCarteiraAtingido, inserirCarteira, listagemCarteiras, listagemCarteirasId, editandoCarteira, deletandoCarteira}
 