const mongoose = require('mongoose');
var uri = "mongodb+srv://admin:admin123@cluster0.kxyqc.mongodb.net/cucoprod?retryWrites=true&w=majority";
mongoose.connect(uri);

let Result = require("../../Domain/Entities/Result");
//const res = require('express/lib/response');
let CarteiraModel = require('../../Domain/Entities/CarteiraModel');
let carteiraSchema = require('../../Domain/Entities/CarteiraModel');

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

function  inserirCarteira(metaFinal, valorAtual, idRestaurante, ong_IdOng, valorPrato, res) {
    
    
    var result = new Result
    var carteira = carteiraSchema();

    carteira.metaFinal = metaFinal;
    carteira.valorAtual = valorAtual;
    carteira.idRestaurante = idRestaurante;
    carteira.ong_IdOng = ong_IdOng;
    carteira.valorPrato = valorPrato;


    carteira.save();
     
    result.content = carteira;
    result.message = "Carteira inserida com sucesso!";
    result.success = true;
    return result;
}

function listagemCarteiras() {
    
   return carteiraSchema
            .find();
    
}

module.exports = {visualizarCarteira, escolhaValorPrato,escolherMetaCarteira, envioMetaCarteiraAtingido, inserirCarteira, listagemCarteiras}
 