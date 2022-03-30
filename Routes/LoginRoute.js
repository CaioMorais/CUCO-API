const express = require("express")
const router = express.Router();
const loginController = require("../Controllers/LoginController");

/**
 * @swagger
 * tags:
 *  name: Login
 *  description: Serve pra logar
 * /api/login/autenticar:
 *  get:
 *      tags: [Login]
 *      parameters:
 *          - name: user
 *            default: 1
 *            in: query
 *            schema:
 *              type: string
 *          - name: password
 *            default: 1
 *            in: query
 *            schema:
 *              type: password
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get('/login/autenticar', loginController.autenticar)

module.exports = router