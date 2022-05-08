const express = require("express")
const carteirarouter = express.Router();
const carteiraController = require("../../Controllers/v1/CarteiraController");


/**
 * @swagger
 * tags:
 *  name: Carteira
 *  description: API's da Carteira
 * /api/v1/Carteira/InsereCarteira:
 *  post:
 *      tags: [Carteira]
 *      parameters:
 *          - name: preco
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
 * /api/v1/Carteira/EnviaEmail:
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




carteirarouter.post('v1/Carteira/InsereCarteira', carteiraController.InsereCarteira)

carteirarouter.get('v1/Carteira/ListaCarteira', carteiraController.ListaCarteira)

carteirarouter.get('v1/Carteira/EnviaEmail', carteiraController.EnviaEmail)

module.exports = carteirarouter



