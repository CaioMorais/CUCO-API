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



/**
 * @swagger
 * tags:
 *  name: GerenciamentoRoute
 *  description: API's de Gerenciamento
 * /api/Gerenciamento/HistoricoRetiradas:
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

Gerenciamentorouter.get('/Gerenciamento/HistoricoDoacoes', GerenciamentoController.HistoricoDoacoes)
Gerenciamentorouter.get('/Gerenciamento/ListaOngs', GerenciamentoController.ListaOngs)
Gerenciamentorouter.get('/Gerenciamento/Solicitacoes', GerenciamentoController.Solicitacoes)
Gerenciamentorouter.get('/Gerenciamento/HistoricoRetiradas', GerenciamentoController.HistoricoRetiradas)

module.exports = Gerenciamentorouter
