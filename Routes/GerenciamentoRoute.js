const express = require("express")
const Gerenciamentorouter = express.Router();
const GerenciamentoController = require("../Controllers/GerenciamentoController");


/**
 * @swagger
 * tags:
 *  name: Gerenciamento
 *  description: API's de Gerenciamento
 * /api/Gerenciamento/HistoricoDoacoes:
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
 *  name: Gerenciamento
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

/**
 * @swagger
 * tags:
 *  name: Gerenciamento
 *  description: API's de Gerenciamento
 * /api/Gerenciamento/ListaOngs:
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
 *  name: Gerenciamento
 *  description: API's de Gerenciamento
 * /api/Gerenciamento/AceitarSolicitacoesDeEstabelecimentos:
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
 *  name: Gerenciamento
 *  description: API's de Gerenciamento
 * /api/Gerenciamento/HistoricoEntregas:
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
 *  name: Gerenciamento
 *  description: API's de Gerenciamento
 * /api/Gerenciamento/GeraSolicitacaoParceriaParaOng:
 *  post:
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
 *  name: Gerenciamento
 *  description: API's de Gerenciamento
 * /api/Gerenciamento/ListaSolicitacoes:
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
Gerenciamentorouter.post('/Gerenciamento/GeraSolicitacaoParceriaParaOng', GerenciamentoController.GeraSolicitacaoParceriaParaOng)
Gerenciamentorouter.get('/Gerenciamento/ListaSolicitacoes', GerenciamentoController.ListaSolicitacoes)
Gerenciamentorouter.get('/Gerenciamento/AceitarSolicitacoesDeEstabelecimentos', GerenciamentoController.AceitarSolicitacoesDeEstabelecimentos)
Gerenciamentorouter.get('/Gerenciamento/HistoricoRetiradas', GerenciamentoController.HistoricoRetiradas)
Gerenciamentorouter.get('/Gerenciamento/HistoricoEntregas', GerenciamentoController.HistoricoEntregas)

module.exports = Gerenciamentorouter
