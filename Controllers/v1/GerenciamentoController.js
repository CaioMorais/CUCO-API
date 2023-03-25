let Result = require("../../Domain/Entities/Result.js");
const {historicoEntregasRetiradas, hisotricoDoacoes, geraSolicitacaoParceriaParaOng,  
    respondeSolicitacao,listaOngs, listaSolicitacoesParaOng, 
    excluirSolicitacaoDeEstabelecimento, listaSolicitacoesEstabelecimentos} = require("../../Services/v1/GerenciamentoService");

exports.HistoricoDoacoes = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await hisotricoDoacoes(id);
    res.status(result.status).send(result);
}

exports.ListaOngs = async (req, res, next) =>{
    var result = await listaOngs();
    res.status(result.status).send(result);

}

//Estabelecimento
exports.GeraSolicitacaoParceriaParaOng = async (req, res, next) =>{
    var result = await geraSolicitacaoParceriaParaOng(req);
    console.log(result);
    res.status(result.status).send(result); 
}

//Estabelecimento
exports.ListaSolicitacoesParaEstabelecimento = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await listaSolicitacoesEstabelecimentos(id);
    console.log(result);
    res.status(result.status).send(result); 
}

//Ong
exports.ListaSolicitacoesParaOng = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await listaSolicitacoesParaOng(id);
    console.log(result);
    res.status(result.status).send(result); 
}


//Ong
exports.RespondeSolicitacaoDeEstabelecimentos = async (req, res, next) =>{
    var id = req.params["id"];
    console.log(id);
    var result = await respondeSolicitacao(id, req.body);
    console.log(result)
    res.status(result.status).send(result)
}

//Estabelcimento
exports.ExcluirSolicitacoesDeEstabelecimentos = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await excluirSolicitacaoDeEstabelecimento(id);
    console.log(result)
    res.status(result.status).send(result)
}


//Estabelecimento/Ong
exports.HistoricoEntregasRetiradas = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await historicoEntregasRetiradas(id);
    res.status(result.status).send(result);
}

