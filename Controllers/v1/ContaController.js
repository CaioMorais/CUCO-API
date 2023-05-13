const express = require("express");
let Result = require("../../Domain/Entities/Result.js");
const {cadastrarConta, editarConta, pegarDadosConta, excluirConta, 
      resetarSenha, enviaEmailResetSenha, aprovaOuNegaContas, listaContasPendentes,
       verificaExisteciaEmail, pegarDadosApenasEstabelecimentoOuOng} = require("../../Services/v1/ContaService");

 
exports.Editar = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await editarConta(id, req);
    console.log(result);
    res.status(result.status).send(result);

}

exports.Excluir = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await excluirConta(id)
    console.log(result);
    res.status(result.status).send(result);

}

exports.PegarDadosConta = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await pegarDadosConta(id)
    res.status(result.status).send(result);

}

exports.PegarDadosEstabelecimentoOuOng = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await pegarDadosApenasEstabelecimentoOuOng(id)
    res.status(result.status).send(result);
}

exports.Cadastrar = async (req, res) =>{
    var result = await cadastrarConta(req);
    console.log(result);
    res.status(result.status).send(result);
}

exports.ConsultaEmail = async (req, res) =>{
    var email = req.params["email"];
    var result = await verificaExisteciaEmail(email);
    console.log(result);
    res.status(result.status).send(result);
}

exports.ResetarSenha = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await resetarSenha(id, req);
    console.log(result);
    res.status(result.status).send(result);
}

exports.EnviaEmailResetSenha = async (req, res, next) =>{
    var email = req.params["email"];
    var result = await enviaEmailResetSenha(email);
    console.log(result);
    res.status(result.status).send(result);
}

exports.aprovaOuNegaContas = async (req, res, next) =>{
    var result = await aprovaOuNegaContas(req);
    res.status(result.status).send(result);
}

exports.listaContasPendentes = async (req, res, next) =>{
    var result = await listaContasPendentes(req);
    res.status(result.status).send(result);
}