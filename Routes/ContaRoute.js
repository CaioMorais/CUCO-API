const express = require("express")
const Contarouter = express.Router();
const ContaController = require("../Controllers/ContaController");

/**
 * @swagger
 * tags:
 *  name: Conta
 *  description: API's de Conta
 * /api/Conta/Editar:
 *  get:
 *      tags: [Conta]
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
 *  name: Conta
 *  description: API's de Conta
 * /api/Conta/Excluir:
 *  get:
 *      tags: [Conta]
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
 *  name: Conta
 *  description: API's de Conta
 * /api/Conta/Cadastrar:
 *  get:
 *      tags: [Conta]
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

Contarouter.get('/Conta/Editar', ContaController.Editar)
Contarouter.get('/Conta/Excluir', ContaController.Excluir)
Contarouter.get('/Conta/Cadastrar', ContaController.Cadastrar)

module.exports = Contarouter