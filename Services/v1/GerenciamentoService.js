let Result = require("../../Domain/Entities/Result");
let estabelecimentoSchema = require('../../Domain/Models/v1/EstabelecimentoModel');
let doacaoSchema = require('../../Domain/Models/v1/DoacaoModel');
let clienteDoadorSchema = require('../../Domain/Models/v1/ClienteDoadorModel');
let solicitacaoParceriaSchema =  require('../../Domain/Models/v1/SolicitacaoParceriaModel');
let carteiraSchema = require('../../Domain/Models/v1/CarteiraModel');
let entregaRetiradasSchema = require('../../Domain/Models/v1/EntregaRetiradaModel');
let historicoEntregaRetiradasSchema = require('../../Domain/Models/v1/HistoricoEntregaRetiradas');

//#region Metodos Principais

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

async function historicoEntregasRetiradasOng(idEstabelecimento){
    try {
      var listaRetiradas = [];
      var retiradas = await historicoEntregaRetiradasSchema.find({idOng: idEstabelecimento}); 

      for (let index = 0; index < retiradas.length; index++) {
          var ret = {
              "dataEntregaRetirada" : retiradas[index].dataEntregaRetirada,
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
                "quantidadePratosDoados" : doacoes[index].quantidadePratosDoados,
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
        result = new Result(null,  false, "Restaurante ja esta com uma solicitação pendente, ou contrato ativo", 200);
        return result;
      };
  
      var carteira = await geraCarteiraPendenteDeResposta(req.body);
      if (carteira._id != null) {

        result = await gerasolciitacaoParceria(req.body, carteira);

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

      var solicitacoes = await solicitacaoParceriaSchema.find({idOng: idOng, respostaOng: "pending"}); 
        
      var listaSolicitacoesPendentes = await listaSolicitacoesPendentesOng(solicitacoes);

      var result = new Result(listaSolicitacoesPendentes, true, "Lista de Solicitações abertas para a Ong", 200);
      return result;

    } catch (error) {
      var result = new Result(error, false, "Internal error", 500);
      return result;
    }
}

async function respondeSolicitacao(idSolicitacao, body){
   if (body.resposta == true) {
      return await aceitaSolicitacao(idSolicitacao);
   } else {
    return await recusaSolicitacao(idSolicitacao);
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
//#endregion

//#region Metodos Auxiliares

//verifica solicitações ativas de restaurantes
const verificaSolicitacoesRestaurante = async (idRestaurante) =>{
    
  let solicitacao = null;   
  if (idRestaurante) {
    solicitacao = await solicitacaoParceriaSchema
                 .findOne({idRestaurante: idRestaurante, respostaOng: "pending"});
  }
  return solicitacao;
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


//Gera lista de solicitações pendentes 
const listaSolicitacoesPendentesOng = async (solicitacoes) =>{
  
  var listaDeSolicitacoes = [];

  for (let index = 0; index < solicitacoes.length; index++) {
    
    var restaurante =  await estabelecimentoSchema.findOne({_id: solicitacoes[index].idRestaurante});
    var carteiraPendente = await carteiraSchema.findOne({_id: solicitacoes[index].idCarteira});

    var resultado = {
        "idSolicitacao" : solicitacoes[index]._id,
        "nomeEstabelecimento" : restaurante.nomeEstabelecimento,
        "estado" : restaurante.estado,
        "cidade" : restaurante.cidade,
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

  return listaDeSolicitacoes;
}

//Atualiza resposta da solicitação 
const atualizaRespostaSolicitacao = async (solicitacao , status, data, respostaOng) =>{ 
  var retorno = null;
  
  try {

    retorno = await solicitacaoParceriaSchema.updateOne({_id: solicitacao._id},{$set:{status: status, dataResposta: data,
      respostaOng : respostaOng}}); 

  } catch (error) {
    return retorno;
  }

  return retorno;
}

//Atualiza status da carteira
const atualizaStatusCarteira = async (carteira, status) =>{ 
  var retorno = null;
  
  try {

    retorno = await carteiraSchema.updateOne({_id: carteira._id},{$set:{status: status}});

  } catch (error) {
    return retorno;
  }

  return retorno;
}

//Deleta carteira pendente
const deletaCarteiraPendente = async (solicitacao) =>{ 
  var retorno = null;
  try {

    var carteira = await carteiraSchema.findOne({_id: solicitacao.idCarteira});
    retorno = await carteiraSchema.deleteOne({_id: carteira._id});

  } catch (error) {
    return retorno;
  }

  return retorno;
}

//Gera tabela para verificacao de entregas e retiradas
const geraTabelaVerificacaoEntregasRetiradas = async (carteira) =>{ 
  var retorno = null;
  
  try {

    var entrRet = {
      "idCarteira" : carteira._id,
      "tokenOng" : " ",
    }
    var entregaRetiradas = entregaRetiradasSchema(entrRet);
    var retorno = await entregaRetiradas.save();

  } catch (error) {
    return retorno;
  }

  return retorno;
}

//Ong Aceita solicitacao estabelecimento
const aceitaSolicitacao = async (idSolicitacao) =>{ 
  try {
    var result;
    var vetorResultado = [];

    //verifica existencia da solicitação
    var solicitacao = await solicitacaoParceriaSchema.findById(idSolicitacao);
    if (!solicitacao) {
      result = new Result("", false, "Solicitação não encontrada", 200);
      return result;
    }

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    
    //Atualiza resposta da solicitação 
    var resultSolicitacao = await atualizaRespostaSolicitacao(solicitacao._id, "true", today.toLocaleDateString(), "true");
    if(resultSolicitacao != null){
      vetorResultado.push(resultSolicitacao);
    }
    else{
      await atualizaRespostaSolicitacao(solicitacao._id, "pending", "", "pending");
      result = new Result("", false, "Erro ao atualizar solicitacao", 200);
      return result;
    }


    var carteira = await carteiraSchema.findOne({_id: solicitacao.idCarteira});
    //Atualiza status carteira 
    var resultCarteira = await atualizaStatusCarteira(carteira, "true");
    if(resultCarteira != null){
      vetorResultado.push(resultCarteira);
    }
    else{
      //retorna solicitação para pendente 
      await atualizaRespostaSolicitacao(solicitacao._id, "pending", "", "pending");

      result = new Result("", false, "Erro ao atualizar status da carteira", 200);
      return result;
    }


    //Gera tabela de verificação para entrega e retirada 
    var resultEntregasRetirada = await geraTabelaVerificacaoEntregasRetiradas(carteira);
    if(resultEntregasRetirada != null){
      vetorResultado.push(resultEntregasRetirada);
    }
    else{
      //retorna solicitação para pendente 
      await atualizaRespostaSolicitacao(solicitacao._id, "pending", "", "pending");

      //retorna carteira para status false 
      await atualizaStatusCarteira(carteira, "false");

      result = new Result("", false, "Erro ao criar tabela para validar entregas e retiradas", 200);
      return result;
    }

    result = new Result(vetorResultado, true, "Solicitação aceita com sucesso", 200);
    return result;

  } catch (error) {
    var result = new Result(error, false, "Internal error", 500);
    return result;
  }
}

//Ong Recusa solicitacao estabelecimento
const recusaSolicitacao = async (idSolicitacao) =>{ 
  try {

    var vetorResultado = [];
    var result;

    //verifica existencia da solicitação
    var solicitacao = await solicitacaoParceriaSchema.findById(idSolicitacao);
    if (!solicitacao) {
      result = new Result("", false, "Solicitação não encontrada", 200);
      return result;
    }
    
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed); 

    //Atualiza resposta da solicitacao
    var resultSolicitacao = await atualizaRespostaSolicitacao(solicitacao._id, "false", today.toLocaleDateString(), "false");
    if(resultSolicitacao != null){
      vetorResultado.push(resultSolicitacao);
    }
    else{
      await atualizaRespostaSolicitacao(solicitacao._id, "pending", "", "pending");
      result = new Result("", false, "Erro ao atualizar solicitacao", 200);
      return result;
    }

    //Deleta carteira pendente
    var resultCarteira = await deletaCarteiraPendente(solicitacao);
    if(resultCarteira != null){
      vetorResultado.push(resultCarteira);
    }
    else{
      await atualizaRespostaSolicitacao(solicitacao._id, "pending", "", "pending");
      result = new Result("", false, "Erro ao excluir carteira pendente", 200);
      return result;
    } 

    result = new Result(vetorResultado, true, "Solicitação recusada com sucesso", 200);
    return result;

  } catch (error) {
    var result = new Result(error, false, "Internal error", 500);
    return result;
  }
}
//#endregion

module.exports = {
    historicoEntregasRetiradas, hisotricoDoacoes, geraSolicitacaoParceriaParaOng, 
    respondeSolicitacao, listaOngs, listaSolicitacoesParaOng, 
    excluirSolicitacaoDeEstabelecimento,listaSolicitacoesEstabelecimentos,historicoEntregasRetiradasOng
}





