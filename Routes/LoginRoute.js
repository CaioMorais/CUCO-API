const express = require("express")
const router = express.Router();
const loginController = require("../Controllers/LoginController");

router.get('/', loginController.teste)

module.exports = router