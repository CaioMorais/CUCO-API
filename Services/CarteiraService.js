var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin123@cluster0.kxyqc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let Result = require("../Domain/Entities/Result.js");

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

function insert(valorPrato) {
    var result = new Result();
    MongoClient.connect(url, function(err,db) {
        if(err) throw err;
        var dbo = db.db("cucoprod");
        dbo.collection("carteira").insertOne(valorPrato, function(err, res){
            if(err) throw err;
            console.log("Valor do Prato inserido");
            db.close();
        });
    });
    result.content = "Valor do prato inserido com sucesso!";
    result.success = true;
    return result;
}

module.exports = {visualizarCarteira, escolhaValorPrato,escolherMetaCarteira, envioMetaCarteiraAtingido, insert }
