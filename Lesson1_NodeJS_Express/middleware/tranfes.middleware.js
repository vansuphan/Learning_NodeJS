
module.exports.csrfProtection =function(){
    var csurf = require('csurf');
    csrf({ cookie: true });
} 