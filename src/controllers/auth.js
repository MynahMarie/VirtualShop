const bcrypt = require('bcryptjs');

const createUser = require('./../models/queries/createUser');
const userExist = require('./../models/queries/userExist');

exports.login = (req, res) => {
  userExist(req.body[0], (err, response) => {
    if (err) console.log(err);;
    console.log(req.body[0]);
    console.log('Result from query: ', response);
    console.log('bcrypt arguments [pass, hash]: ', req.body[1], response[0].hash);
    bcrypt.compare(req.body[1], response[0].hash, (err, result) => {
      if (err) console.log(err);
      console.log('Result from bcrypt compare is: ', result);
      if (result === false) {
        res.status(401).send(result);
      } else {
        res.status(200).send(result);
      }
    })
  })
}

exports.logout = (req, res) => {
  res.send('NOT YET IMPLEMENTED : logout');
}

exports.newuser = (req, res) => {
  // res.send('NOT YET IMPLEMENTED : newuser');
  console.log('Request is: ', req.body);
  bcrypt.hash(req.body[1], 10, (e, h) => {
    if (e) console.log('error in bcrypt: ', e);
    console.log('hash is: ', h);
    req.body[1] = h;
    console.log('data with new hash is: ', req.body);
    createUser(req.body, (err, result) => {
      if (err) console.log('error in createUser: ', err);
      console.log(result);
      res.sendStatus(200);
    })
  })
}

exports.products = (req, res) => {
  res.send('NOT YET IMPLEMENTED : products');
}

exports.cart = (req, res) => {
  res.send('NOT YET IMPLEMENTED : cart');
}
