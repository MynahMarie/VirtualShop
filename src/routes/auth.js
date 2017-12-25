const express = require('express');
const auth = require('./../controllers/auth');
const error = require('./../controllers/error');
const jwt = require('jsonwebtoken');

const routerAuth = express.Router();

// Check that a cookie is set, is still valid and has not been tampered with.
routerAuth.use((req, res, next) => {
  const token = req.cookies.User;
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        const msg = 'Your browser did something funny. Please contact the administration.'
        return error.server(msg, req, res, next);
      }
      console.log('decoded token: ', decoded);
      req.decoded = decoded;
      next();
    })
  } else {
    return res.status(403).send('You are not logged in');
  }
});

routerAuth.get('/logout', auth.logout);
routerAuth.post('/logout', auth.logout);
routerAuth.get('/products', auth.products);
routerAuth.post('/products', auth.products);
routerAuth.get('/cart', auth.cart);
routerAuth.post('/cart', auth.cart);
routerAuth.get('/profile', auth.history);
routerAuth.post('/profile', auth.history);

module.exports = routerAuth;
