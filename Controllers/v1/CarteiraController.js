let Result = require("../../Domain/Entities/Result");
const { 
        envioMetaCarteiraAtingido, inserirCarteira, listagemCarteiras, listagemCarteirasId, 
        editandoCarteira, deletandoCarteira, editandoValorPrato, incrementandoSaldo} = require("../../Services/v1/CarteiraService");


exports.InsereCarteira = async (req, res, next) =>{
    var result = new Result();
    result = await inserirCarteira(req);
    console.log(result);
    res.status(200).send(result);
}

exports.ListaCarteira = async (req, res, next) =>{
    var listagem = await listagemCarteiras();
    res.status(200).send(listagem);
}

exports.ListaCarteiraId = async (req, res, next) =>{
    var id = req.params["id"];
    var listagemId = await listagemCarteirasId(id);
    res.status(200).send(listagemId);
}

exports.EditaCarteira = async (req, res, next) =>{
    var id = req.params["id"];
    var resposta = await editandoCarteira(id, req);
    res.status(200).send(resposta);
}

exports.DeletaCarteira = async (req, res, next) =>{
    var id = req.params["id"];
    var resposta = await deletandoCarteira(id);
    res.status(200).send(resposta);
}
exports.EditaValorPrato = async(req, res, next) => {
    var id = req.body.id;
    var novoValor = req.body.valorPrato;
    var resposta = await editandoValorPrato(id, novoValor);
    res.status(200).send(resposta);
}

exports.IncrementaSaldo = async(req, res, next) =>{
    var id = req.params["id"];
    var resposta = await incrementandoSaldo(id, req);
    res.status(200).send(resposta);
}

exports.EnviaEmail = (req, res, next) =>{
    var result = new Result("EnviaEmail", true, 'Email enviado com Sucesso!');
    console.log(result);
    res.status(200).send(result);
}

