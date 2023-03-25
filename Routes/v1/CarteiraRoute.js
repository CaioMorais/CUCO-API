const express = require("express")
const carteirarouter = express.Router();
const carteiraController = require("../../Controllers/v1/CarteiraController");
const {verificaToken} = require("../../Security/usuarioMiddleware")

/**
 * @swagger
 * tags:
 *  name: Carteira
 *  description: API's de Gerenciamento da carteira ONG/Estabelecimento
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
 *              description: teste resposta
 */
 carteirarouter.post('/v1/Carteira/InsereCarteira',verificaToken, carteiraController.InsereCarteira)

/**
 * @swagger
 * tags:
 *  name: Carteira
 *  description: API's de Gerenciamento da carteira ONG/Estabelecimento
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
 carteirarouter.get('/v1/Carteira/ListaCarteiraId/:id',verificaToken, carteiraController.ListaCarteiraId)


/**
 * @swagger
 * tags:
 *  name: Carteira
 *  description: API's de Gerenciamento da carteira ONG/Estabelecimento
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
 carteirarouter.get('/v1/Carteira/ListaCarteira',verificaToken, carteiraController.ListaCarteira)

/**
 * @swagger
 * tags:
 *  name: Carteira
 *  description: API's de Gerenciamento da carteira ONG/Estabelecimento
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
 carteirarouter.put('/v1/Carteira/EditarCarteira/:id',verificaToken, carteiraController.EditaCarteira)

/**
 * @swagger
 * tags:
 *  name: Carteira
 *  description: API's de Gerenciamento da carteira ONG/Estabelecimento
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
carteirarouter.delete('/v1/Carteira/DeletaCarteira/:id',verificaToken, carteiraController.DeletaCarteira)

/**
 * @swagger
 * tags:
 *  name: Carteira
 *  description: API's de Gerenciamento da carteira ONG/Estabelecimento
 * /api//v1/Carteira/EditaValorPrato/:
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
carteirarouter.put('/v1/Carteira/EditaValorPrato/',verificaToken, carteiraController.EditaValorPrato)

/**
 * @swagger
 * tags:
 *  name: Carteira
 *  description: API's de Gerenciamento da carteira ONG/Estabelecimento
 * /api/v1/Carteira/ListaCarteiraIdRestaurante/:id:
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
 carteirarouter.get('/v1/Carteira/ListaCarteiraIdRestaurante/:id',verificaToken, carteiraController.ListaCarteiraIdRestaurante)

 /**
 * @swagger
 * tags:
 *  name: Carteira
 *  description: API's de Gerenciamento da carteira ONG/Estabelecimento
 * /api/v1/Carteira/ListaCarteiraIdOng/:id:
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
  carteirarouter.get('/v1/Carteira/ListaCarteiraIdOng/:id',verificaToken, carteiraController.ListaCarteiraIdOng)

   /**
 * @swagger
 * tags:
 *  name: Carteira
 *  description: API's de Gerenciamento da carteira ONG/Estabelecimento
 * /api/v1/Carteira/PegarValorPrato/:id':
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
  carteirarouter.get('/v1/Carteira/PegarValorPrato/:id',verificaToken, carteiraController.PegarValorPrato)


module.exports = carteirarouter



