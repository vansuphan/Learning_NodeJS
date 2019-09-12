var express = require('express');
var controller = require('../controllers/transfer.controller');
var router = express.Router();

router.get('/', controller.create);
router.post('/',controller.postCreate);
module.exports = router;