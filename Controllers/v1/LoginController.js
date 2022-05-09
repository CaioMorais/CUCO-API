const express = require("express");
let Result = require("../../Domain/Entities/Result.js")
const {realizarLogin} = require("../../Services/v1/LoginService")
 
exports.autenticar = async (req, res) =>{
    const email =  req.query.email;
    const senha =  req.query.senha;
    const resposta = await realizarLogin(email, senha);
    if (resposta == 'User not found') return res.status(401).send(resposta);
    const result = resposta
    res.status(200).send(result)
}



