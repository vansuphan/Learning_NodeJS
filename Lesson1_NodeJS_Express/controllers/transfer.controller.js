const db = require('../db.js');
const ids = require('short-id');
module.exports.create = function(req,res,next){
    res.render('transfer/create',
        { csrfToken: req.csrfToken() }
    )
};

module.exports.postCreate = function(req,res,next){
    var data = {
        "id" : ids.generate(),
        "account" : req.body.email,
        "money": parseInt(req.body.money),
        "userID" : req.signedCookies.userID
    }
    db.get('transfer').push(data).write();
    res.redirect('/transfer');
}