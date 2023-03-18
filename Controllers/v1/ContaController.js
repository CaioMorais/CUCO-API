const express = require("express");
let Result = require("../../Domain/Entities/Result.js");
const {cadastrarConta, editarConta, pegarDadosConta, excluirConta, resetarSenha, enviaEmailResetSenha} = require("../../Services/v1/ContaService");

 
exports.Editar = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await editarConta(id, req);
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

exports.Cadastrar = async (req, res) =>{
    var result = await cadastrarConta(req);
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
    var result = await enviaEmailResetSenha(req);
    console.log(result);
    res.status(result.status).send(result);
}