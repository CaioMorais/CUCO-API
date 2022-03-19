//js
const express = require('express');
const {app} = require('../Controllers/LoginController');
const router = express.Router();
router.get('/teste', app);
module.exports = router;