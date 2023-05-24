let Result = require("../../Domain/Entities/Result");
const { 
        inserirCarteira, listagemCarteiras, listagemCarteiraId, 
        editandoCarteira, deletandoCarteira, editandoValorPrato, listagemCarteiraIDRestaurante,
        listaValorPratoId, listagemCarteirasIDOng, listagemCarteiraIDRestaurantePaginaDoacao} = require("../../Services/v1/CarteiraService");


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
    var result = await listagemCarteiraId(id);
    res.status(result.status).send(result);
}

exports.PegarValorPrato = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await listaValorPratoId(id);
    res.status(result.status).send(result);
}

exports.ListaCarteiraIdRestaurante = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await listagemCarteiraIDRestaurante(id);
    res.status(result.status).send(result);
}

exports.ListaCarteiraIdRestaurantePaginaDoacao = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await listagemCarteiraIDRestaurantePaginaDoacao(id);
    res.status(result.status).send(result);
}

exports.ListaCarteiraIdOng = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await listagemCarteirasIDOng(id);
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


