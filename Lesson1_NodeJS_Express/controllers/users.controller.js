const db = require('../db.js');
const ids = require('short-id');

module.exports.index = function (req, res) {
    res.render('users/users', {
        users: db.get('users').value(),
        //cartNumber: cartNumber?cartNumbers:0
    })
}

module.exports.search = function(req, res) {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter(function (user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/users', {
            users: matchedUsers
    })
}

module.exports.createUser = function(req, res){
    res.render('users/create');
} 

module.exports.postCreateUser = function (req, res, next) {
    var newUser = {
        id: ids.generate(req.params.id),
        name: req.body.name,
        phone: req.body.phone,
        avatar: req.file.path.split('\\').slice(1).join('/')
    }
    //console.log(req.params.id);
    db.get('users').push(newUser).write();
    res.redirect('/users');
}

module.exports.viewId = function(req,res){
    var id = req.params.id;
    var user = db.get('users').find({id : id}).value();
    res.render('users/view',{
        user : user
    });
}