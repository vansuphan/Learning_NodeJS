const db = require('../db.js');
module.exports.addToCart = function (req, res, next) {
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionUserID;
    if (!sessionId) {
        res.redirect('/products');
        return;
    }
    var cartNumber = db.get('sessions')
        .find({id: sessionId})
        .get('cart.' + productId, 0)
        .value();
    console.log(db.get('sessions').find({id:sessionId}).value());
    db.get('sessions')
        .find({ id: sessionId })
        .set('cart.' + productId, cartNumber + 1)
        .write();
    //db.get('sessions').find({id: sessionId}).set(['cart.'] + name ,productId +  sl, 1).write();
    res.redirect('/products');
}