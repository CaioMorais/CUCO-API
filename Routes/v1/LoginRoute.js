const express = require("express")
const router = express.Router();
const loginController = require("../../Controllers/v1/LoginController");

/**
 * @swagger
 * tags:
 *  name: Login
 *  description: Serve pra logar
 * /api/v1/login/autenticar/:
 *  get:
 *      tags: [Login]
 *      parameters:
 *          - name: email
 *            default: juniorfreitas@mail.com
 *            in: query
 *            schema:
 *              type: string
 *          - name: senha
 *            default: 12345678
 *            in: query
 *            schema:
 *              type: password
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get('/v1/login/autenticar', loginController.autenticar)


module.exports = router