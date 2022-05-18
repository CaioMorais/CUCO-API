const express = require("express");
let Result = require("../../Domain/Entities/Result.js");
const {cadastrarConta, editarConta, excluirConta, resetarSenha} = require("../../Services/v1/ContaService");

 
exports.Editar = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await editarConta(id, req);
    res.status(200).send(result);
}

exports.Excluir = async (req, res, next) =>{
    var id = req.params["id"];
    var result = await excluirConta(id)
    console.log(result);
    res.status(200).send(result);
}

exports.Cadastrar = async (req, res) =>{
    console.log(req.body);
    result = await cadastrarConta(req);
    console.log(result);
    res.status(result.status).send(result);
}

exports.ResetarSenha = (req, res, next) =>{
    result = new Result("Cadastrar", true, 'Senha Editada com Sucesso!');
    console.log(result);
    res.status(200).send(result);
}