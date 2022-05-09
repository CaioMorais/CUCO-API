let Result = require("../../Domain/Entities/Result");
const {visualizarCarteira, escolhaValorPrato,escolherMetaCarteira, 
        envioMetaCarteiraAtingido, inserirCarteira, listagemCarteiras, listagemCarteirasId, 
        editandoCarteira, deletandoCarteira} = require("../../Services/v1/CarteiraService");



exports.InsereCarteira = async (req, res, next) =>{
    var result = new Result();

    var metaFinal = req.body.metaFinal;
    var valorAtual = req.body.valorAtual;
    var idRestaurante = req.body.idRestaurante;
    var ong_IdOng = req.body.ong_IdOng;
    var valorPrato = req.body.valorPrato;


    result = await inserirCarteira(metaFinal, valorAtual, idRestaurante, ong_IdOng, valorPrato, res);
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
    var metaFinal = req.body.metaFinal;
    var valorAtual = req.body.valorAtual;
    var idRestaurante = req.body.idRestaurante;
    var ong_IdOng = req.body.ong_IdOng;
    var valorPrato = req.body.valorPrato;


    var resposta = await editandoCarteira(id, metaFinal, valorAtual, idRestaurante, ong_IdOng, valorPrato);
    res.status(200).send(resposta);
}

exports.DeletaCarteira = async (req, res, next) =>{
    var id = req.params["id"];
    var resposta = await deletandoCarteira(id);
    res.status(200).send(resposta);
}

exports.EnviaEmail = (req, res, next) =>{
    var result = new Result("EnviaEmail", true, 'Email enviado com Sucesso!');
    console.log(result);
    res.status(200).send(result);
}