let Result = require("../../Domain/Entities/Result.js");
const {hitoricoRetiradas, hisotricoEntrega, hisotricoDoacoes, geraSolicitacaoParceriaParaOng,  
    aceitarSolicitacoesDeEstabelecimentos,listaOngs, listaSolicitacoesParaOng, 
    recusaSolicitacoesDeEstabelecimentos, excluirSolicitacaoDeEstabelecimento, listaSolicitacoesEstabelecimentos} = require("../../Services/v1/GerenciamentoService");

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

//Ong
exports.ListaSolicitacoesParaEstabelecimento = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await listaSolicitacoesEstabelecimentos(id);
    console.log(result);
    res.status(result.status).send(result); 
}

exports.ListaSolicitacoesParaOng = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await listaSolicitacoesParaOng(id);
    console.log(result);
    res.status(result.status).send(result); 
}


//Ong
exports.AceitarSolicitacoesDeEstabelecimentos = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await aceitarSolicitacoesDeEstabelecimentos(id);
    console.log(result)
    res.status(result.status).send(result)
}

exports.RecusaSolicitacoesDeEstabelecimentos = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await recusaSolicitacoesDeEstabelecimentos(id);
    console.log(result)
    res.status(result.status).send(result)
}

exports.ExcluirSolicitacoesDeEstabelecimentos = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await excluirSolicitacaoDeEstabelecimento(id);
    console.log(result)
    res.status(result.status).send(result)
}


//Estabelecimento
exports.HistoricoRetiradas = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await hitoricoRetiradas(id);
    res.status(result.status).send(result);
}


//Ong
exports.HistoricoEntregas = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await hisotricoEntrega(id);
    res.status(result.status).send(result);
}

