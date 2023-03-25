let Result = require("../../Domain/Entities/Result");
let estabelecimentoSchema = require('../../Domain/Models/v1/EstabelecimentoModel');
let doacaoSchema = require('../../Domain/Models/v1/DoacaoModel');
let clienteDoadorSchema = require('../../Domain/Models/v1/ClienteDoadorModel');
let solicitacaoParceriaSchema =  require('../../Domain/Models/v1/SolicitacaoParceriaModel');
let carteiraSchema = require('../../Domain/Models/v1/CarteiraModel');
let entregaRetiradasSchema = require('../../Domain/Models/v1/EntregaRetiradaModel');
let historicoEntregaRetiradasSchema = require('../../Domain/Models/v1/HistoricoEntregaRetiradas');

//Ong/Estabelecimento
async function historicoEntregasRetiradas(idEstabelecimento){
    try {
      var listaRetiradas = [];
      var retiradas = await historicoEntregaRetiradasSchema.find({idRestaurante: idEstabelecimento}); 

      for (let index = 0; index < retiradas.length; index++) {
          var ret = {
              "dataEntregaRetirada" : retiradas[index].dataEntregaRetirada,
              "nomeOng": retiradas[index].nomeOng,
              "nomeRestaurante" : retiradas[index].nomeRestaurante,
              "quantidadePratosEntregues" : retiradas[index].quantidadePratosEntregues

          }
          console.log(ret);
          listaRetiradas.push(ret);
      }

      var result = new Result(listaRetiradas, true, "Historico de Entregas e Retiradas", 200);
      return result;

    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }
}

//Estabelecimento
async function hisotricoDoacoes(idRestaurante){
    try {
        //Function junta os dados das docaoes e dos doadores e devolve um array
        var listaDoacoes = [];
        var doacoes = await doacaoSchema.find({idRestaurante: idRestaurante}); 

        for (let index = 0; index < doacoes.length; index++) {
            doador = await clienteDoadorSchema.findOne({_id: doacoes[index].idClienteDoador});
            var doacao = {
                "valorDoacao" : doacoes[index].valorDoacao,
                "dataDoacao": doacoes[index].dataDoacao,
                "nomeDoador" : doador.nome
            }
            listaDoacoes.push(doacao);
        }

        var result = new Result(listaDoacoes, true, "Historico de doações", 200);
        return result;

    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }
}

//Estabelecimento
async function listaOngs(){
    try {

        var listaOngs = await estabelecimentoSchema.find({tipo: "ONG"}); 
        var result = new Result(listaOngs, true, "Lista de Ongs", 200);
        return result;

    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }
}

async function listaSolicitacoesEstabelecimentos(idEstabelecimento){
  try {
    
      var solicitacao = await solicitacaoParceriaSchema.find({idRestaurante: idEstabelecimento});
      var result = new Result(solicitacao, true, "lista de solicitacoes", 200);
      return result;

  } catch (error) {
    var result = new Result(error, false, "Internal error", 500);
    return result;
  }
}

//Estabelecimento
 async function geraSolicitacaoParceriaParaOng(req){
    try{
      var result;

      var verfContratosRestaurantes = await verificaSolicitacoesRestaurante(req.body.idRestaurante);
      if (verfContratosRestaurantes){
        result = new Result(null,  false, "Restaurante ja esta com uma solicitação pendente, ou contrato ativo", 400);
        return result;
      };
  
      var carteira = await geraCarteiraPendenteDeResposta(req.body);
      if (carteira._id != null) {

        result = gerasolciitacaoParceria(req.body, carteira);

        if(result._id != null){
          result = new Result( result, true, "Solicitação de parceria efetuada", 200);
        }
      }
      else{
        result = new Result( result, false, "Solicitação de parceria não efetuada ", 400);
      }

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
      var solicitacoes = await solicitacaoParceriaSchema.find({idOng: idOng, respostaOng: "pending"}); 

      for (let index = 0; index < solicitacoes.length; index++) {

        var restaurante =  await estabelecimentoSchema.findOne({_id: solicitacoes[index].idRestaurante});
        var carteiraPendente = await carteiraSchema.findOne({_id: solicitacoes[index].idCarteira});

        var resultado = {
            "idSolicitacao" : solicitacoes[index]._id,
            "nomeEstabelecimento" : restaurante.nomeEstabelecimento,
            "estado" : restaurante.estado,
            "bairro" : restaurante.bairro,
            "cep" : restaurante.cep,
            "logradouro" : restaurante.logradouro,
            "numero" : restaurante.numero,
            "complemento" : restaurante.complemento,
            "telefone" : restaurante.telefone,
            "paginaWeb" : restaurante.paginaWeb,
            "dataSolicitacao": solicitacoes[index].dataSolicitacao,
            "metaFinal": carteiraPendente.metaFinal,
            "valorPrato": carteiraPendente.valorPrato,
            "descPratoDoado" : carteiraPendente.descPratoDoado
        }

        listaDeSolicitacoes.push(resultado);

      }
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
      console.log(idSolicitacao);
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
    var solicitacao = await solicitacaoParceriaSchema.findById(idSolicitacao);
    var carteira = await carteiraSchema.findOne({_id: solicitacao.idCarteira});
    
    var resultado = [];
    var resultCarteira = await carteiraSchema.deleteOne({_id: carteira._id});
    resultado.push(resultCarteira);

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed); 
    var resultContrato = await solicitacaoParceriaSchema.updateOne({_id: solicitacao._id},{$set:{status: "false", dataResposta: today.toLocaleDateString(),
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
      
      var resultado = await solicitacaoParceriaSchema.deleteOne({_id: idSolicitacao});

      var result = new Result(resultado, true, "Solicitação excluida com sucesso", 200);
      return result;
    
  } catch (error) {
    var result = new Result(error, false, "Internal error", 500);
    return result;
  }
  
}
////------------------------------------------Auxiliares----------------------------------------------------

const verificaSolicitacoesRestaurante = async (idRestaurante) =>{
    
  let contrato = null;   
  if (idRestaurante) {
      contrato = await solicitacaoParceriaSchema
                 .findOne({idRestaurante: idRestaurante});
  }
  return contrato;
}

//Gera carteira com status pendente 
const geraCarteiraPendenteDeResposta = async (body) =>{
    
  var car = {
    "metaFinal": body.metaFinal, 
    "valorAtual": "0", 
    "idRestaurante": body.idRestaurante, 
    "idOng": body.idOng,
    "valorPrato": body.valorPrato,
    "descPratoDoado" : body.descPratoDoado,
    "entregasPendentes" : "0",
    "status" : "pending"
  }

  var carteira = carteiraSchema(car); //Gera a Carteira com que vai aguarda a aprovação da ong
  
  await carteira.save();

  return carteira;
}

//Gera solicitação de parceria
const gerasolciitacaoParceria = async (body, carteira) =>{
  
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed); 

  var solicitacao = {
    "idOng": body.idOng,
    "idRestaurante" : body.idRestaurante,  
    "respostaOng": "pending", 
    "respostaRestaurante": "true", 
    "status": "pending",
    "dataSolicitacao" : today.toLocaleDateString(),
    "dataResposta" : "pending",
    "idCarteira" : carteira._id
  } 

  var contrato = solicitacaoParceriaSchema(solicitacao); // Gera uma solicitação que aguarda a resposta da Ong, para liberar a carteira
  var resultado = await contrato.save();

  return resultado
}

module.exports = {
    historicoEntregasRetiradas, hisotricoDoacoes, geraSolicitacaoParceriaParaOng, 
    aceitarSolicitacoesDeEstabelecimentos, listaOngs, listaSolicitacoesParaOng, 
    recusaSolicitacoesDeEstabelecimentos, excluirSolicitacaoDeEstabelecimento,listaSolicitacoesEstabelecimentos
}





