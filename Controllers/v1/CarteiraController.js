let Result = require("../../Domain/Entities/Result");
const { 
        inserirCarteira, listagemCarteiras, listagemCarteirasId, 
        editandoCarteira, deletandoCarteira, editandoValorPrato} = require("../../Services/v1/CarteiraService");


exports.InsereCarteira = async (req, res, next) =>{
    var result = await inserirCarteira(req);
    console.log(result);
    res.status(result.status).send(result);
}

exports.ListaCarteira = async (req, res, next) =>{
    var result = await listagemCarteiras();
    res.status(result.status).send(result);
}

exports.ListaCarteiraId = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await listagemCarteirasId(id);
    res.status(result.status).send(result);
}

exports.EditaCarteira = async (req, res, next) =>{
    var id = req.params["id"];
    var resposta = await editandoCarteira(id, req);
    res.status(result.status).send(resposta);
}

exports.DeletaCarteira = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await deletandoCarteira(id);
    res.status(result.status).send(result);
}

exports.EditaValorPrato = async(req, res, next) => {
    var id = req.body.id;
    var novoValor = req.body.valorPrato;
    var result = await editandoValorPrato(id, novoValor);
    res.status(result.status).send(result);
}


