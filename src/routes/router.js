const express = require('express');
const router = express.Router();

const home = require('./../controllers/home');
const auth = require('./../controllers/auth');
const error = require('./../controllers/error');

router.get('/', home.home);

// router.get('/login', auth.login);
// router.get('/newuser', auth.newuser);
// router.get('/logout', auth.logout);
// router.get('/products', auth.products);
// router.get('/products', auth.products);
// router.get('/cart', auth.cart);
// router.get('/cart', auth.cart);

// router.use(error.client);
// router.use(error.server);

module.exports = router;
