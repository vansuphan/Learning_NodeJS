const md5 = require('md5');
const db = require('../db.js');

module.exports.login = function(req,res){
     res.render('authentication/login');
}

module.exports.postlogin = function(req,res){
     var email = req.body.email;
     var password = req.body.password;
     var user = db.get('users').find({email : email}).value();
     if(!user){
          res.render('authentication/login.pug',{
               errors: [
                    'User dose not exit.'
               ],
               values:req.body
          });
          return;
     }
     if(user.password !== md5(password)){
          res.render('authentication/login.pug',{
               errors: [
                    'Wrong Password.'
               ],
               values: req.body
          })
          return;
     }
     res.cookie('userID', user.id,{
          signed: true
     });
     res.redirect('users');
};

