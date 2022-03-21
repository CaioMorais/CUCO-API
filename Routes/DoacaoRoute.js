const express = require("express")
const Doacaorouter = express.Router();
const DoacaoController = require("../Controllers/DoacaoController");

Doacaorouter.get('/Doacao/QRCodePaginaDoacao', DoacaoController.QRCodePaginaDoacao)
Doacaorouter.get('/Doacao/PaginaDoacao', DoacaoController.PaginaDoacao)
Doacaorouter.get('/Doacao/ConfirmaTokenRetirada', DoacaoController.ConfirmaTokenRetirada)
Doacaorouter.get('/Doacao/GeraTokenRetirada', DoacaoController.GeraTokenRetirada)
Doacaorouter.get('/Doacao/EnviaEmailRecompensa', DoacaoController.EnviaEmailRecompensa)
Doacaorouter.get('/Doacao/CadastraDoacao', DoacaoController.CadastraDoacao)

module.exports = Doacaorouter
