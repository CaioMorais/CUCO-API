const express = require("express")
const Doacaorouter = express.Router();
const DoacaoController = require("../Controllers/DoacaoController");




/**
 * @swagger
 * tags:
 *  name: Doação
 *  description: API's de Doação
 * /api/Doacao/CadastraDoacao:
 *  get:
 *      tags: [Doação]
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
 *  name: Doação
 *  description: API's de Doação
 * /api/Doacao/QRCodePaginaDoacao:
 *  get:
 *      tags: [Doação]
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
 *  name: Doação
 *  description: API's de Doação
 * /api/Doacao/ConfirmaTokenRetirada:
 *  get:
 *      tags: [Doação]
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
 *  name: Doação
 *  description: API's de Doação
 * /api/Doacao/GeraTokenRetirada:
 *  get:
 *      tags: [Doação]
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
 *  name: Doação
 *  description: API's de Doação
 * /api/Doacao/PaginaDoacao:
 *  get:
 *      tags: [Doação]
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
 *  name: Doação
 *  description: API's de Doação
 * /api/Doacao/EnviaEmailRecompensa:
 *  get:
 *      tags: [Doação]
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


Doacaorouter.get('/Doacao/QRCodePaginaDoacao', DoacaoController.QRCodePaginaDoacao)
Doacaorouter.get('/Doacao/PaginaDoacao', DoacaoController.PaginaDoacao)
Doacaorouter.get('/Doacao/ConfirmaTokenRetirada', DoacaoController.ConfirmaTokenRetirada)
Doacaorouter.get('/Doacao/GeraTokenRetirada', DoacaoController.GeraTokenRetirada)
Doacaorouter.get('/Doacao/EnviaEmailRecompensa', DoacaoController.EnviaEmailRecompensa)
Doacaorouter.get('/Doacao/CadastraDoacao', DoacaoController.CadastraDoacao)

module.exports = Doacaorouter
