const express = require("express")
const Doacaorouter = express.Router();
const DoacaoController = require("../Controllers/DoacaoController");

/**
 * @swagger
 * tags:
 *  name: Doação
 *  description: API's de Doação
 * /api/Doacao/CadastraDoacao:
 *  post:
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
 * /api/Doacao/QRCodeLinkDoacao:
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
 * /api/Doacao/ValidaToken:
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
 * /api/Doacao/GeraTokenEntrega:
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


Doacaorouter.get('/Doacao/QRCodeLinkDoacao', DoacaoController.QRCodeLinkDoacao)
Doacaorouter.get('/Doacao/ValidaToken', DoacaoController.ValidaToken)
Doacaorouter.get('/Doacao/GeraTokenEntrega', DoacaoController.GeraTokenEntrega)
Doacaorouter.get('/Doacao/GeraTokenRetirada', DoacaoController.GeraTokenRetirada)
Doacaorouter.post('/Doacao/CadastraDoacao', DoacaoController.CadastraDoacao)

module.exports = Doacaorouter
