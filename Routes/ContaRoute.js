const express = require("express")
const Contarouter = express.Router();
const ContaController = require("../Controllers/ContaController");

/**
 * @swagger
 * tags:
 *  name: Conta
 *  description: API's de Conta
 * /api/Conta/Editar:
 *  post:
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
 *  post:
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
 * /api/Conta/ResetarSenha:
 *  post:
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

Contarouter.post('/Conta/Editar', ContaController.Editar)
Contarouter.get('/Conta/Excluir', ContaController.Excluir)
Contarouter.post('/Conta/Cadastrar', ContaController.Cadastrar)
Contarouter.post('/Conta/ResetarSenha', ContaController.ResetarSenha)

module.exports = Contarouter