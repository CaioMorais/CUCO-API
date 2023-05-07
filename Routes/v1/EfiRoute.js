const express = require("express")
const efiRouter = express.Router();
const efiController = require("../../Controllers/v1/EfiController");
const {verificaToken} = require("../../Security/usuarioMiddleware");

efiRouter.post('/v1/Efi/GerarCobranca', efiController.gerarCobranca)

module.exports = efiRouter