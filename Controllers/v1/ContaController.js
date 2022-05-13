const express = require("express");
let Result = require("../../Domain/Entities/Result.js");
const {cadastrarConta, editarConta, excluirConta, resetarSenha} = require("../../Services/v1/ContaService");

 

exports.Editar = (req, res, next) =>{
    result = new Result("Editar", true, 'Cadastro Editado com Sucesso!');
    console.log(result);
    res.status(200).send(result);
}

exports.Excluir = (req, res, next) =>{
    result = new Result("Excluir", true, 'Cadastro Excluído com Sucesso!');
    console.log(result);
    res.status(200).send(result);
}

exports.Cadastrar = async (req, res) =>{
    result = await cadastrarConta(req);
    console.log(result);
    res.status(200).send(result);
}

exports.ResetarSenha = (req, res, next) =>{
    result = new Result("Cadastrar", true, 'Senha Editada com Sucesso!');
    console.log(result);
    res.status(200).send(result);
}