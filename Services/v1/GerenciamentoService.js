let estabelecimentoSchema = require('../../Domain/Models/v1/EstabelecimentoModel');

//Ong
function hitoricoRetiradas(){

}

//Estabelecimento
function hisotricoEntrega(){

}

//Estabelecimento
function hisotricoDoacoes(){

}

//Estabelecimento
async function listaOngs(){
    return await estabelecimentoSchema.find({tipoEstabelecimento: "ONG"}); 
}

//Estabelecimento
function geraSolicitacaoParceriaParaOng(){

}

//Ong
function listaSolicitacoes(){

}

//ONG
function aceitarSolicitacoesDeEstabelecimentos(){

}
 
module.exports = {
    hitoricoRetiradas, hisotricoEntrega, hisotricoDoacoes, geraSolicitacaoParceriaParaOng, 
    aceitarSolicitacoesDeEstabelecimentos, listaOngs, listaSolicitacoes
}





