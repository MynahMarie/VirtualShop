const error = require('./error');
const displayItems = require('./../models/queries/displayItems');

exports.logout = (req, res) => {
  //Clear the cookie and redirect to login
  res.clearCookie('User');
  res.redirect('/');
}

exports.products = (req, res) => {
  //Fetch the items from the DB and pass them to the view for rendering.
  displayItems((err, items) => {
    if (err) {
      console.error('Code 8: ', err.stack);
      return error.server(err, req, res, next);
    }
    res.status(200).render('products', { activePage: { products: true }, items });
  })
}

exports.cart = (req, res) => {
  res.status(200).render('cart');
}

exports.history = (req, res) => {
  res.status(200).render('history');
}
