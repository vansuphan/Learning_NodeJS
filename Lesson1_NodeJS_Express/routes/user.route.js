const express = require('express');
var multer = require('multer'); // v1.0.5
const ids = require('short-id');
const router = express.Router();
let controller = require('../controllers/users.controller');
let validation = require('../middleware/users.validation');
//let authMiddleware = require('../middleware/authentication.middleware');

var upload = multer({ dest: 'public/uploads/' }) // for parsing multipart/form-data

router.get('/', controller.index);
// router.get('/cookie', function(req,res,next){
//     res.cookie('SSID', ids.generate());
//     res.send('Hello');
// });
router.get('/search',controller.search);
router.get('/create', controller.createUser);
router.post('/create',
    upload.single('avatar'),
    validation.postCreateUser,
    controller.postCreateUser);
router.get('/:id', controller.viewId);

module.exports = router;
