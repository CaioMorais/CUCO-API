const express = require("express")
const Contarouter = express.Router();
const ContaController = require("../../Controllers/v1/ContaController");
const {verificaToken} = require("../../Security/usuarioMiddleware");



/* *
 * @swagger
 * tags:
 *  name: Conta
 *  description: API's de Conta
 * /api/v1/Conta/Editar/:id:
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
 Contarouter.put('/v1/Conta/Editar/:id',verificaToken, ContaController.Editar)


/**
 * @swagger
 * tags:
 *  name: Conta
 *  description: API's de Conta
 * /api/v1/Conta/Excluir/:id:
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
 Contarouter.delete('/v1/Conta/Excluir/:id',verificaToken, ContaController.Excluir)


/**
 * @swagger
 * tags:
 *  name: Conta
 *  description: API's de Conta
 * /api/v1/Conta/Cadastrar:
 *  post:
 *      tags: [Conta]
 *      parameters:
 *          - name: page_number
 *            default: {
 *                       nome : Junior,
 *                       cpf: 46578926570,
 *                       email : juniorfreitas@mail.com,
 *                       senha : testeteste,
 *                       tipoConta: ONG,
 *                       idEstabelecimeto: 555566555455, 
 *                       dataCadastro : 25/06/2020,
 *                       nomeEstabelecimento : Fundação Reviver,
 *                       tipoEstabelecimento : ONG,
 *                       cnpj: 1455255664457,
 *                       cidade: SP,
 *                       estado: São Paulo,
 *                       endereco: Rua das Flores,4001,
 *                       emailEstabelecimento: fundacaoreviver@mail.com,
 *                       contato: 11958942502
 *                     }
 *            in: body
 *            schema:
 *              type: object
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
 Contarouter.post('/v1/Conta/Cadastrar', ContaController.Cadastrar)


/**
 * @swagger
 * tags:
 *  name: Conta
 *  description: API's de Conta
 * /api/v1/Conta/ResetarSenha/:id:
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
Contarouter.post('/v1/Conta/ResetarSenha/:id', ContaController.ResetarSenha)


/**
 * @swagger
 * tags:
 *  name: Conta
 *  description: API's de Conta
 * /api/v1/Conta/EnviaEmailResetSenha/:
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
 Contarouter.post('/v1/Conta/EnviaEmailResetSenha', ContaController.EnviaEmailResetSenha)

 /**
 * @swagger
 * tags:
 *  name: Conta
 *  description: Retorna dados da conta
 * /api/v1/Conta/PegarDadosConta/:id:
 *  post:
 *      tags: [Conta]
 *      parameters:
 *          - name: id
 *            default: 1
 *            in: uri
 *            schema:
 *              type: string
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
 Contarouter.get('/v1/Conta/PegarDadosConta/:id',verificaToken, ContaController.PegarDadosConta)
 


module.exports = Contarouter