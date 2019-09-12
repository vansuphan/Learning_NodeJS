const ids = require('short-id');
const db = require('../db');
module.exports.cartNumber = function (req, res, next) {
    var sessionId = req.signedCookies.sessionUserID;
    var cart = db.get('sessions').find({id: sessionId}).value();
    if(!req.signedCookies.sessionUserID){
        res.redirect('/products');
        return;
    }
    if (!cart['cart']) {
        var cartNumber = 0;
    } else {
        var cartNumber = Object.values(cart['cart']).reduce(function (begin, nextValue) {
            return begin + nextValue;
        });
    }
    res.locals.cartNumber = cartNumber
    next();
}