const express = require("express")
const Gerenciamentorouter = express.Router();
const GerenciamentoController = require("../../Controllers/v1/GerenciamentoController");
const {verificaToken} = require("../../Infrastructure/usuario.middleware")


/**
 * @swagger
 * tags:
 *  name: Gerenciamento
 *  description: API's de Gerenciamento
 * /api/v1/Gerenciamento/HistoricoDoacoes:
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
 Gerenciamentorouter.get('/v1/Gerenciamento/HistoricoDoacoes', verificaToken, GerenciamentoController.HistoricoDoacoes)

/**
 * @swagger
 * tags:
 *  name: Gerenciamento
 *  description: API's de Gerenciamento
 * /api/v1/Gerenciamento/HistoricoRetiradas:
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
 Gerenciamentorouter.get('/v1/Gerenciamento/HistoricoRetiradas',verificaToken, GerenciamentoController.HistoricoRetiradas)

/**
 * @swagger
 * tags:
 *  name: Gerenciamento
 *  description: API's de Gerenciamento
 * /api/v1/Gerenciamento/ListaOngs:
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
 Gerenciamentorouter.get('/v1/Gerenciamento/ListaOngs',verificaToken, GerenciamentoController.ListaOngs)



/**
 * @swagger
 * tags:
 *  name: Gerenciamento
 *  description: API's de Gerenciamento
 * /api/v1/Gerenciamento/AceitarSolicitacoesDeEstabelecimentos:
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
 Gerenciamentorouter.get('/v1/Gerenciamento/AceitarSolicitacoesDeEstabelecimentos', GerenciamentoController.AceitarSolicitacoesDeEstabelecimentos)


/**
 * @swagger
 * tags:
 *  name: Gerenciamento
 *  description: API's de Gerenciamento
 * /api/v1/Gerenciamento/HistoricoEntregas:
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
 Gerenciamentorouter.get('/v1/Gerenciamento/HistoricoEntregas',verificaToken, GerenciamentoController.HistoricoEntregas)

/**
 * @swagger
 * tags:
 *  name: Gerenciamento
 *  description: API's de Gerenciamento
 * /api/v1/Gerenciamento/GeraSolicitacaoParceriaParaOng:
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
 Gerenciamentorouter.post('/v1/Gerenciamento/GeraSolicitacaoParceriaParaOng', GerenciamentoController.GeraSolicitacaoParceriaParaOng)

/**
 * @swagger
 * tags:
 *  name: Gerenciamento
 *  description: API's de Gerenciamento
 * /api/v1/Gerenciamento/ListaSolicitacoes:
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
 Gerenciamentorouter.get('/v1/Gerenciamento/ListaSolicitacoes', GerenciamentoController.ListaSolicitacoes)

module.exports = Gerenciamentorouter
