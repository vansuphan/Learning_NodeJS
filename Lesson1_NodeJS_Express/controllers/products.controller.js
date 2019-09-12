const db = require('../db.js');

module.exports.products = function (req, res) {
    var page = parseInt(req.query.page) || 1; // n
    var perPage = 8; // x
    var start = (page - 1) * perPage;
    var end = page * perPage;
    //var drop = page - 1;
    var pageNumber = db.get('products').value().length;
    var arrPageNumber = [];
    for (var i = 0; i < Math.ceil(pageNumber / 8); i++) {
        arrPageNumber.push(i);
    }
    if ( parseInt(req.query.page) <= 0 || parseInt(req.query.page) > Math.ceil(pageNumber / 8) ) {
        console.log(page);
        res.redirect('/products');
    }else{
        res.render('products/products', {
            products: db.get('products').value().slice(start, end),
            //products: db.get('products').drop(drop).take(perPage).value(),
            arrPageNumber: arrPageNumber,
            page: page
        });
    }
}

module.exports.searchProducts = function (req, res) {
    var searchProducts = req.query.q;
    var matchedProducts = db.get('products').value().filter(function (product) {
        return product.name.toLowerCase().indexOf(searchProducts.toLowerCase()) !== -1;
    });
    var page = parseInt(req.query.page) || 1; // n
    var perPage = 8; // x
    var start = (page - 1) * perPage;
    var end = page * perPage;
    var pageNumber = matchedProducts.length;
    var arrPageNumber = [];
    for (var i = 0; i < Math.ceil(pageNumber / 8); i++) {
        arrPageNumber.push(i);
    }
    if ( parseInt(req.query.page) <= 0 || parseInt(req.query.page) > Math.ceil(pageNumber / 8) ) {
        res.redirect('/products');
    }else{
        res.render('products/products', {
            products: matchedProducts.slice(start, end),
            arrPageNumber: arrPageNumber,
            page: page,
            query: req.query.q
        });
    }
    // res.render('products/products', {
    //     products: matchedProducts
    // })
}