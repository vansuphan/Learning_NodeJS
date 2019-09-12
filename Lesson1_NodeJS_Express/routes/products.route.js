var express = require('express');
var controller = require('../controllers/products.controller');
var router = express.Router();

router.get('/', controller.products);
router.get('/search',controller.searchProducts);
module.exports = router;