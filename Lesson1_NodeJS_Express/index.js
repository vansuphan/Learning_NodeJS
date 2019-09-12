require('dotenv').config(); 
const express = require('express');
const app = express();
const port = 1000;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
const userRoute = require('./routes/user.route');
const loginRoute = require('./routes/authentication.route');
const productRoute = require('./routes/products.route');
const cartRoute = require('./routes/cart.route');
const transferRoute = require('./routes/transfer.route');
const sessionIdMiddleWare = require('./middleware/session.middleware');
const authMiddleWareLogin = require('./middleware/authentication.middleware');
const cartMiddleWare = require('./middleware/cart.middleware');
//const csrfMiddleware = require('./middleware/tranfes.middleware')
app.set('view engine', 'pug');
app.set('views', './view');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})) // for parsing application/x-www-form-urlencoded
var csrfProtection = csrf({ cookie: true }); // un-csrf-attack 
app.use(cookieParser(process.env.secret_cookies));  // cookies User login
app.use(sessionIdMiddleWare.sessionID);   // sessionid user
//app.use(cartMiddleWare.cartNumber);
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.render("index", {
        name: 'NodeJS'
    });
});

app.use('/login', loginRoute);
app.use('/users', authMiddleWareLogin.requireAuth, userRoute);
app.use('/products',cartMiddleWare.cartNumber, productRoute );
app.use('/cart', cartRoute);
app.use('/transfer', csrfProtection, authMiddleWareLogin.requireAuth, csrfProtection, transferRoute);

app.listen(port, () => {
    console.log('Hello Client...');
});


