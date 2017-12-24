const express = require('express');
const auth = require('./../controllers/auth');

const routerAuth = express.Router();

routerAuth.post('/login', auth.login);
routerAuth.post('/newuser', auth.newuser);
routerAuth.post('/logout', auth.logout);
routerAuth.get('/products', auth.products);
routerAuth.post('/products', auth.products);
routerAuth.get('/cart', auth.cart);
routerAuth.post('/cart', auth.cart);

module.exports = routerAuth;
