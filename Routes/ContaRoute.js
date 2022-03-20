const express = require("express")
const Contarouter = express.Router();
const ContaController = require("../Controllers/ContaController");

Contarouter.get('/Editar', ContaController.Editar)
Contarouter.get('/Excluir', ContaController.Excluir)
Contarouter.get('/Cadastrar', ContaController.Cadastrar)

module.exports = Contarouter