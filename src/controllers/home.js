const bcrypt = require('bcryptjs');
const error = require('./error');
const createUser = require('./../models/queries/createUser');
const userExist = require('./../models/queries/userExist');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const randomstring = require('randomstring');
const { deleteCart } = require('./../models/queries/cart');

// Middleware that will create a JWT token to be used in the cookie
const createToken = (id, username, cb) => {
  const payload = {
    user_id: id,
    username: username,
    exp: Date.now() + 9999,
    iat: Date.now(),
    jti: randomstring.generate({ length: 12, charset: 'alphanumeric' }),
    iss: 'Virtual Shop'
  }
  jwt.sign(payload, process.env.SECRET, (err, token) => {
    if (err) return cb(err);
    else cb(null, token);
  })
}

// The home route leads to the signup and login page, cookies and cart are cleared when landing here.
exports.home = (req, res) => {
  const cookies = req.cookies.User;
  if (cookies !== undefined) {
    const userId = jwtDecode(req.cookies.User).user_id;
    deleteCart(userId, (err, success) => {
      if (err) return error.server(err, req, res, console.error('Code 8: ', err.stack));
      console.log(success);
      //Clear the cookie and redirect to login
      res.clearCookie('User');
      res.redirect('/');
    })
  }
  else res.render('home', { activePage: { home: true }});
}

// Login route accessed when hitting the submit button. If successful, will redirect to /auth/products.
exports.login = (req, res) => {
  // Check if users exists.
  userExist(req.body[0], (err, response) => {
    if (err) return error.server(err, req, res, console.error('Code 1: ', err.stack));
    else if (response === 'No Match Found') {
      return res.status(403).send('Invalid username or password');
    }
    // If user exists, compare the password provided with the hash in DB.
    bcrypt.compare(req.body[1], response[0].hash, (err, result) => {
      if (err) return error.server(err, req, res, console.error('Code 2: ', err.stack));
      else if (result === false) res.sendStatus(403);
      else {
        // Create a JWT and set the cookie.
        createToken(response[0].id, req.body[0], (err, token) => {
          if (err) return error.server(err, req, res, console.error('Code 3: ', err.stack));

          res.cookie('User', token, { httpOnly: true });
          res.sendStatus(200);
        })
      }
    })
  })
}

// Accessed through /newuser endpoint, if succesful will redirect to /auth/products.
exports.newuser = (req, res) => {
  userExist(req.body[0], (err, result) => {
    if (err) return error.server(err, req, res, console.error('Code 4: ', err.stack));
    // If another user is found with the same username, prompt the user to choose another one.
    else if (result !== 'No Match Found') {
      res.sendStatus(403);
    }
    // Otherwise, hash the password and insert new user in DB.
    else {
      bcrypt.hash(req.body[1], 10, (err, hash) => {
        if (err) return error.server(err, req, res, console.error('Code 5: ', err.stack));

        req.body[1] = hash;
        createUser(req.body, (err, id) => {
          if (err) return error.server(err, req, res, console.error('Code 6: ', err.stack));
          // Set cookie
          createToken(id, req.body[0], (err, token) => {
            if (err) return error.server(err, req, res, console.error('Code 7: ', err.stack));

            res.cookie('User', token, { httpOnly: true });
            console.log('Cookie Set newUser: ', token);
            res.sendStatus(200);
          })
        })
      })
    }
  })
}
