const express = require("express")
const carteirarouter = express.Router();

const carteiraController = require("../Controllers/CarteiraController");

carteirarouter.get('/ParametrizaPrecos', carteiraController.ParametrizaPrecos)
carteirarouter.get('/EnviaEmail', carteiraController.EnviaEmail)

module.exports = carteirarouter



