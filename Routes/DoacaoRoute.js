const express = require("express")
const Doacaorouter = express.Router();
const DoacaoController = require("../Controllers/DoacaoController");

Doacaorouter.get('/QRCodePaginaDoacao', DoacaoController.QRCodePaginaDoacao)
Doacaorouter.get('/PaginaDoacao', DoacaoController.PaginaDoacao)
Doacaorouter.get('/ConfirmaTokenRetirada', DoacaoController.ConfirmaTokenRetirada)
Doacaorouter.get('/GeraTokenRetirada', DoacaoController.GeraTokenRetirada)

module.exports = Doacaorouter
