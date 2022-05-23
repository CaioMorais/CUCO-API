let Result = require("../../Domain/Entities/Result");
let estabelecimentoSchema = require('../../Domain/Models/v1/EstabelecimentoModel');
let doacaoSchema = require('../../Domain/Models/v1/DoacaoModel');
let clienteDoadorSchema = require('../../Domain/Models/v1/ClienteDoadorModel');
let contratoORSchema =  require('../../Domain/Models/v1/ContratoORModel');
let carteiraSchema = require('../../Domain/Models/v1/CarteiraModel');
let entregaRetiradasSchema = require('../../Domain/Models/v1/EntregaRetiradaModel');

//Ong
function hitoricoRetiradas(){
    try {
       
    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }
}

//Estabelecimento
function hisotricoEntrega(){
    try {
       
    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }
}

//Estabelecimento
async function hisotricoDoacoes(idRestaurante){
    try {
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

    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }
}

//Estabelecimento
async function listaOngs(){
    try {
        var listaOngs = await estabelecimentoSchema.find({tipoEstabelecimento: "ONG"}); 
        var result = new Result(listaOngs, true, "Lista de Ongs", 200);
        return result;
    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }
}

async function listaSolicitacoesEstabelecimentos(idEstabelecimento){
  try {
      var solicitacao = await contratoORSchema.find({idRestaurante: idEstabelecimento});

      var ONG =  await estabelecimentoSchema.findOne({_id: solicitacao.idOng});

      var resultado = {
          "nomeOng" : ONG.nomeEstabelecimento,
          "respostaOng" : solicitacao.respostaOng,
          "dataSolicitacao" : solicitacao.dataSolicitacao,
          "dataResposta" : solicitacao.dataResposta,
          "contatoONG": ONG.contato
      }

      var result = new Result(resultado, true, "Solicitação efetuada", 200);
      return result;
  } catch (error) {
    var result = new Result(error, false, "Internal error", 500);
    return result;
  }
}

//Estabelecimento
 async function geraSolicitacaoParceriaParaOng(req){
    var verfContratosRestaurantes = await verificaSolicitacoesRestaurante(req.body.idRestaurante);
    console.log(verfContratosRestaurantes)

    if (verfContratosRestaurantes){
      var result = new Result(null,  false, "Restaurante ja esta com uma solicitação pendente, ou contrato ativo", 400);
      return result;
    };

    var carteira = {
      "metaFinal": req.body.metaFinal, 
      "valorAtual": "0", 
      "idRestaurante": req.body.idRestaurante, 
      "idOng": req.body.idOng,
      "valorPrato": req.body.valorPrato,
      "entregasPendentes" : "0",
      "status" : "pending"
    }

    var carteira = carteiraSchema(carteira); //Gera a Carteira com que vai aguarda a aprovação da ong

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed); 

    try {
      var cont = {
        "idOng": req.body.idOng,
        "idRestaurante" : req.body.idRestaurante,  
        "respostaOng": "pending", 
        "respostaRestaurante": "true", 
        "status": "pending",
        "dataSolicitacao" : today.toLocaleDateString(),
        "dataResposta" : "pending",
        "idCarteira" : carteira._id
      } 

      var contrato = contratoORSchema(cont); // Gera um contrato que aguarda a resposta da Ong, para liberar a carteira
      var resultado = await contrato.save();

      await carteira.save();

      var result = new Result( resultado, true, "Solicitação de parceria efetuada", 200);
      return result;

    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }
}


//Ong
async function listaSolicitacoesParaOng(idOng){
    try {
      var listaDeSolicitacoes = [];
      var solicitacoes = await contratoORSchema.find({idOng: idOng, respostaOng: "pending"}); 
      for (let index = 0; index < solicitacoes.length; index++) {
        var restaurante =  await estabelecimentoSchema.findOne({_id: solicitacoes[index].idRestaurante});
        var carteira = await carteiraSchema.findOne({_id: solicitacoes[index].idCarteira});

        var resultado = {
            "idSolicitacao" : solicitacoes[index]._id,
            "nomeEstabelecimento" : restaurante.nomeEstabelecimento,
            "endereco" : restaurante.endereco,
            "contato" : restaurante.contato,
            "dataSolicitacao": solicitacoes[index].dataSolicitacao,
            "metaFinal": carteira.metaFinal,
            "valorPrato": carteira.valorPrato
        }
        console.log(resultado);
        listaDeSolicitacoes.push(resultado);
      }
      console.log(listaDeSolicitacoes);
      var result = new Result(listaDeSolicitacoes, true, "Lista de Solicitações abertas para a Ong", 200);
      return result;

    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }
}

//ONG
async function aceitarSolicitacoesDeEstabelecimentos(idSolicitacao){
    try {
      var solicitacao = await contratoORSchema.findById(idSolicitacao);
      var carteira = await carteiraSchema.findOne({_id: solicitacao.idCarteira});
      
      var resultado = [];
      var resultCarteira = await carteiraSchema.updateOne({_id: carteira._id},{$set:{status: "true"}});
      resultado.push(resultCarteira);

      const timeElapsed = Date.now();
      const today = new Date(timeElapsed); 
      var resultContrato = await contratoORSchema.updateOne({_id: solicitacao._id},{$set:{status: "true", dataResposta: today.toLocaleDateString(),
      respostaOng : "true"}});
      resultado.push(resultContrato);
      
      var entrRet = {
        "idCarteira" : carteira._id,
        "tokenOng" : " ",
        "tokenRestaurante" : " ",
        "verificaTokenOng" : "false", 
        "verificaTokenRestaurante" : "false" 
      }
      var entregaRetiradas = entregaRetiradasSchema(entrRet);
      var resultEntregasRetirada = await entregaRetiradas.save();
      resultado.push(resultEntregasRetirada);

      var result = new Result(resultado, true, "Solicitação aceita com sucesso", 200);
      return result;

    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }
}

//ONG
async function recusaSolicitacoesDeEstabelecimentos(idSolicitacao){
  try {
    var solicitacao = await contratoORSchema.findById(idSolicitacao);
    var carteira = await carteiraSchema.findOne({_id: solicitacao.idCarteira});
    
    var resultado = [];
    var resultCarteira = await carteiraSchema.deleteOne({_id: carteira._id});
    resultado.push(resultCarteira);

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed); 
    var resultContrato = await contratoORSchema.updateOne({_id: solicitacao._id},{$set:{status: "false", dataResposta: today.toLocaleDateString(),
    respostaOng : "false"}});

    resultado.push(resultContrato);

    var result = new Result(resultado, true, "Solicitação recusada com sucesso", 200);
    return result;

  } catch (error) {
    var result = new Result(error, false, "Internal error", 500);
    return result;
  }
}

async function excluirSolicitacaoDeEstabelecimento(idSolicitacao){
  try {
      
      var resultado = await contratoORSchema.deleteOne({_id: idSolicitacao});

      var result = new Result(resultado, true, "Solicitação excluida com sucesso", 200);
      return result;
    
  } catch (error) {
    var result = new Result(error, false, "Internal error", 500);
    return result;
  }
  
}
////Auxiares----------------------------------------------------

const verificaSolicitacoesRestaurante = async (idRestaurante) =>{
    
  let contrato = null;   
  if (idRestaurante) {
      contrato = await contratoORSchema
                 .findOne({idRestaurante: idRestaurante});
  }
  return contrato;
}

module.exports = {
    hitoricoRetiradas, hisotricoEntrega, hisotricoDoacoes, geraSolicitacaoParceriaParaOng, 
    aceitarSolicitacoesDeEstabelecimentos, listaOngs, listaSolicitacoesParaOng, 
    recusaSolicitacoesDeEstabelecimentos, excluirSolicitacaoDeEstabelecimento,listaSolicitacoesEstabelecimentos
}





