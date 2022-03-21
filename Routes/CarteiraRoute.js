const express = require("express")
const carteirarouter = express.Router();
const carteiraController = require("../Controllers/CarteiraController");

carteirarouter.get('/Carteira/ParametrizaPrecos', carteiraController.ParametrizaPrecos)
carteirarouter.get('/Carteira/EnviaEmail', carteiraController.EnviaEmail)

module.exports = carteirarouter



