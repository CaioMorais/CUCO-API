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
    //Function junta os dados das docaoes e dos doadores e devolve um array
    var element = [];
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
    var result = new Result(element, true, "Historico de doações", 200);
    return result;
}

//Estabelecimento
async function listaOngs(){
    var listaOngs = await estabelecimentoSchema.find({tipoEstabelecimento: "ONG"}); 
    var result = new Result(listaOngs, true, "Lista de Ongs", 200);
    return result;
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





