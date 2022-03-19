const express = require("express")
const Gerenciamentorouter = express.Router();
const GerenciamentoController = require("../Controllers/GerenciamentoController");

Gerenciamentorouter.get('/HistoricoDoacoes', GerenciamentoController.HistoricoDoacoes)

module.exports = Gerenciamentorouter
