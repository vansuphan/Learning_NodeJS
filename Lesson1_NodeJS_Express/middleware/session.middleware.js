const ids = require('short-id');
const db = require('../db');
module.exports.sessionID = function (req, res, next) {
    if (!req.signedCookies.sessionUserID) {
        var sessionId = ids.generate();
        res.cookie('sessionUserID', sessionId, {
            signed: true
        });
        db.get('sessions').push({'id': sessionId}).write();
    }
    next();
}