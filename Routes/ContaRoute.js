const express = require("express")
const Contarouter = express.Router();
const ContaController = require("../Controllers/ContaController");

Contarouter.get('/', ContaController.Editar)

module.exports = Contarouter