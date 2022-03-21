const express = require("express")
const Gerenciamentorouter = express.Router();
const GerenciamentoController = require("../Controllers/GerenciamentoController");
/**
 * @swagger
 * tags:
 *  name: GerenciamentoRoute
 *  description: API's de Gerenciamento
 * /api/HistoricoDoacoes:
 *  get:
 *      tags: [Gerenciamento]
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
Gerenciamentorouter.get('/HistoricoDoacoes', GerenciamentoController.HistoricoDoacoes)
Gerenciamentorouter.get('/ListaOngs', GerenciamentoController.ListaOngs)
Gerenciamentorouter.get('/Solicitacoes', GerenciamentoController.Solicitacoes)

module.exports = Gerenciamentorouter
