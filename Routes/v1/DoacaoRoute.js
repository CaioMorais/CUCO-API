const express = require("express")
const Doacaorouter = express.Router();
const DoacaoController = require("../../Controllers/v1/DoacaoController");

/**
 * @swagger
 * tags:
 *  name: Doação
 *  description: API's de Doação
 * /api/v1/Doacao/CadastraDoacao:
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
 Doacaorouter.post('v1/Doacao/CadastraDoacao', DoacaoController.CadastraDoacao)


/**
 * @swagger
 * tags:
 *  name: Doação
 *  description: API's de Doação
 * /api/v1/Doacao/QRCodeLinkDoacao:
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
 Doacaorouter.get('v1/Doacao/QRCodeLinkDoacao', DoacaoController.QRCodeLinkDoacao)

/**
 * @swagger
 * tags:
 *  name: Doação
 *  description: API's de Doação
 * /api/v1/Doacao/GeraTokenRetirada:
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
 Doacaorouter.get('v1/Doacao/GeraTokenRetirada', DoacaoController.GeraTokenRetirada)

/**
 * @swagger
 * tags:
 *  name: Doação
 *  description: API's de Doação
 * /api/v1/Doacao/ValidaToken:
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
 Doacaorouter.get('v1/Doacao/ValidaToken', DoacaoController.ValidaToken)


/**
 * @swagger
 * tags:
 *  name: Doação
 *  description: API's de Doação
 * /api/v1/Doacao/GeraTokenEntrega:
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
 Doacaorouter.get('v1/Doacao/GeraTokenEntrega', DoacaoController.GeraTokenEntrega)

module.exports = Doacaorouter
