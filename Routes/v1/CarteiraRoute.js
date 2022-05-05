const express = require("express")
const carteirarouter = express.Router();
const carteiraController = require("../../Controllers/CarteiraController");


/**
 * @swagger
 * tags:
 *  name: Carteira
 *  description: API's da Carteira
 * /api/Carteira/ParametrizaPrecos:
 *  get:
 *      tags: [Carteira]
 *      parameters:
 *          - name: page_number
 *            default: 1
 *            in: body
 *            schema:
 *              type: string
 *      responses:
 *          default:
 *              description: This is the default response for it
 */



/**
 * @swagger
 * tags:
 *  name: Carteira
 *  description: API's da Carteira
 * /api/Carteira/EnviaEmail:
 *  get:
 *      tags: [Carteira]
 *      parameters:
 *          - name: page_number
 *            default: 1
 *            in: body
 *            schema:
 *              type: string
 *      responses:
 *          default:
 *              description: This is the default response for it
 */



carteirarouter.get('/Carteira/ParametrizaPrecos', carteiraController.ParametrizaPrecos)
carteirarouter.get('/Carteira/EnviaEmail', carteiraController.EnviaEmail)

module.exports = carteirarouter



