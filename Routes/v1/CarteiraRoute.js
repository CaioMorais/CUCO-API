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
 carteirarouter.post('/v1/Carteira/InsereCarteira', carteiraController.InsereCarteira)


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
 carteirarouter.get('/v1/Carteira/EnviaEmail', carteiraController.EnviaEmail)


/**
 * @swagger
 * tags:
 *  name: Carteira
 *  description: API's da Carteira
 * /api/v1/Carteira/ListaCarteira:
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
 carteirarouter.get('/v1/Carteira/ListaCarteiraId/:id', carteiraController.ListaCarteiraId)


/**
 * @swagger
 * tags:
 *  name: Carteira
 *  description: API's da Carteira
 * /api/v1/Carteira/ListaCarteiraId/:id:
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
 carteirarouter.get('/v1/Carteira/ListaCarteira', carteiraController.ListaCarteira)

/**
 * @swagger
 * tags:
 *  name: Carteira
 *  description: API's da Carteira
 * /api/v1/Carteira/EditaCarteira/:id:
 *  put:
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
 carteirarouter.put('/v1/Carteira/EditarCarteira/:id', carteiraController.EditaCarteira)

/**
 * @swagger
 * tags:
 *  name: Carteira
 *  description: API's da Carteira
 * /api/v1/Carteira/DeletaCarteira/:id:
 *  delete:
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
 carteirarouter.delete('/v1/Carteira/DeletaCarteira/:id', carteiraController.DeletaCarteira)

/**
 * @swagger
 * tags:
 *  name: Carteira
 *  description: API's da Carteira
 * /v1/Carteira/EditaValorPrato/:id:
 *  put:
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
 carteirarouter.put('/v1/Carteira/EditaValorPrato/:id', carteiraController.EditaValorPrato)



module.exports = carteirarouter



