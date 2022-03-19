const express = require("express")
const router = express.Router();
const loginController = require("../Controllers/LoginController");

/**
 * @swagger
 * tags:
 *  name: Login
 *  description: Serve pra logar
 * /api/login/teste:
 *  get:
 *      tags: [Login]
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
router.get('/login/teste', loginController.teste)
router.get('/auth/teste', loginController.teste)

module.exports = router