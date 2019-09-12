const express = require('express');
const controller = require('../controllers/authentication.controller');
const router = express.Router();

router.get('/', controller.login);
router.post('/', controller.postlogin);
module.exports = router;
