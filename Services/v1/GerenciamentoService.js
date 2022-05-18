let Result = require("../../Domain/Entities/Result");
let estabelecimentoSchema = require('../../Domain/Models/v1/EstabelecimentoModel');
let doacaoSchema = require('../../Domain/Models/v1/DoacaoModel');
let clienteDoadorSchema = require('../../Domain/Models/v1/ClienteDoadorModel');

//Ong
function hitoricoRetiradas(){

}

//Estabelecimento
function hisotricoEntrega(){

}

//Estabelecimento
async function hisotricoDoacoes(idRestaurante){
    //return await doacaoSchema.find({idRestaurante: idRestaurante}); 
    var element
    var doacoes = await doacaoSchema.find({idRestaurante: idRestaurante}); 
    for (let index = 0; index < doacoes.length; index++) {
        doador = await clienteDoadorSchema.findOne({_id: doacoes[index].idClienteDoador});
        var doa = {
            "valorDoacao" : doacoes[index].valorDoacao,
            "dataDoacao": doacoes[index].dataDoacao,
            "nomeDoador" : doador.nome
        }
        console.log(doa);
        element.push(doa);
    }
    console.log(element);
    return element;
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





