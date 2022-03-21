const express = require("express")
const Contarouter = express.Router();
const ContaController = require("../Controllers/ContaController");

Contarouter.get('/Conta/Editar', ContaController.Editar)
Contarouter.get('/Conta/Excluir', ContaController.Excluir)
Contarouter.get('/Conta/Cadastrar', ContaController.Cadastrar)

module.exports = Contarouter