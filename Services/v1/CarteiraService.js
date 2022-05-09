const mongoose = require('mongoose');
var uri = "mongodb+srv://admin:admin123@cluster0.kxyqc.mongodb.net/cucoprod?retryWrites=true&w=majority";
mongoose.connect(uri);

let Result = require("../../Domain/Entities/Result");
//const res = require('express/lib/response');
let CarteiraModel = require('../../Models/v1/CarteiraModel');
let carteiraSchema = require('../../Models/v1/CarteiraModel');

//Ong e Estabelecimento
function visualizarCarteira(){

}

//Estabelecimento
function escolhaValorPrato(){

}

//Estabelecimento
function escolherMetaCarteira(){

}

//Ong
function envioMetaCarteiraAtingido(){

}

 async function  inserirCarteira(metaFinal, valorAtual, idRestaurante, ong_IdOng, valorPrato, res) {
    
    
    var result = new Result
    var carteira = carteiraSchema();

    carteira.metaFinal = metaFinal;
    carteira.valorAtual = valorAtual;
    carteira.idRestaurante = idRestaurante;
    carteira.ong_IdOng = ong_IdOng;
    carteira.valorPrato = valorPrato;


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

 async function editandoCarteira(id, metaFinal, valorAtual, idRestaurante, ong_IdOng, valorPrato) {

    return await carteiraSchema
             .updateOne({_id: id}, {$set:{metaFinal, valorAtual, idRestaurante, ong_IdOng, valorPrato}});
 }

 async function deletandoCarteira(id) {

    return await carteiraSchema
             .remove({_id: id});
 }

module.exports = {visualizarCarteira, escolhaValorPrato,escolherMetaCarteira, envioMetaCarteiraAtingido, inserirCarteira, listagemCarteiras, listagemCarteirasId, editandoCarteira, deletandoCarteira}
 