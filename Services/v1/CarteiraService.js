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

function  insert(cart) {
    
    var carteira = new CarteiraModel();
    var result = new Result();
    carteira = carteiraSchema(cart);

    carteira.insert()
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}));


    result.content = "Carteira inserida com sucesso!";
    result.success = true;
    return result;
}

function listagem() {
    
   var resposta = carteiraSchema
            .find()
            .then((data) => res.json(data))
            .catch((error)=> res.json({message: error}));
    return resposta;
}

module.exports = {visualizarCarteira, escolhaValorPrato,escolherMetaCarteira, envioMetaCarteiraAtingido, insert, listagem}
