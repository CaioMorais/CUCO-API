const express = require("express")
const Gerenciamentorouter = express.Router();
const GerenciamentoController = require("../../Controllers/v1/GerenciamentoController");
const {verificaToken} = require("../../Security/usuarioMiddleware")


/**
 * @swagger
 * tags:
 *  name: Gerenciamento
 *  description: API's de Gerenciamento
 * /api/v1/Gerenciamento/HistoricoDoacoes/:id:
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
 Gerenciamentorouter.get('/v1/Gerenciamento/HistoricoDoacoes/:id', verificaToken, GerenciamentoController.HistoricoDoacoes)

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
 * /api/v1/Gerenciamento/RespondeSolicitacaoDeEstabelecimentos/:id:
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
 Gerenciamentorouter.post('/v1/Gerenciamento/RespondeSolicitacaoDeEstabelecimentos/:id',verificaToken, GerenciamentoController.RespondeSolicitacaoDeEstabelecimentos)


/**
 * @swagger
 * tags:
 *  name: Gerenciamento
 *  description: API's de Gerenciamento
 * /api/v1/Gerenciamento/HistoricoEntregas/:id:
 *  get:
 *      tags: [Gerenciamento]
 *      parameters:
 *          - name: auth
 *            default: 1
 *            in: header
 *            description: Token de autorização do Header
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *            description: Successful response, with a representation of the Tax Filing.
 *          404:
 *            description: The requested tax filing was not found.
 */
 Gerenciamentorouter.get('/v1/Gerenciamento/HistoricoEntregasRetiradas/:id',verificaToken, GerenciamentoController.HistoricoEntregasRetiradas)
 Gerenciamentorouter.get('/v1/Gerenciamento/HistoricoEntregasRetiradasOng/:id',verificaToken, GerenciamentoController.HistoricoEntregasRetiradasOng)

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
 Gerenciamentorouter.post('/v1/Gerenciamento/GeraSolicitacaoParceriaParaOng',verificaToken, GerenciamentoController.GeraSolicitacaoParceriaParaOng)

/**
 * @swagger
 * tags:
 *  name: Gerenciamento
 *  description: API's de Gerenciamento
 * /api/v1/Gerenciamento/listaSolicitacoesParaOng/:id:
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
 Gerenciamentorouter.get('/v1/Gerenciamento/listaSolicitacoesParaOng/:id',verificaToken, GerenciamentoController.ListaSolicitacoesParaOng)

 /**
 * @swagger
 * tags:
 *  name: Gerenciamento
 *  description: API's de Gerenciamento
 * /api/v1/Gerenciamento/listaSolicitacoesParaEstabelecimento/:id:
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
  Gerenciamentorouter.get('/v1/Gerenciamento/listaSolicitacoesParaEstabelecimento/:id',verificaToken, GerenciamentoController.ListaSolicitacoesParaEstabelecimento)



  /**
 * @swagger
 * tags:
 *  name: Gerenciamento
 *  description: API's de Conta
 * /api/v1/Gerenciamento/ExcluirSolicitacoesDeEstabelecimentos/:id:
 *  delete:
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
 Gerenciamentorouter.delete('/v1/Gerenciamento/ExcluirSolicitacoesDeEstabelecimentos/:id',verificaToken, GerenciamentoController.ExcluirSolicitacoesDeEstabelecimentos)

module.exports = Gerenciamentorouter
