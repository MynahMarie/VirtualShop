const error = require('./error');
const displayItems = require('./../models/queries/displayItems');
const showHistory = require('./../models/queries/showHistory');
const getBalance = require('./../models/queries/getBalance');
const { addItem, deleteCart, showCart } = require('./../models/queries/cart');

const jwtDecode = require('jwt-decode');

exports.logout = (req, res) => {
  //Start by deleting all the items in the cart that have not been bought by user.
  const userId = jwtDecode(req.cookies.User).user_id;
  deleteCart(userId, (err, success) => {
    if (err) return error.server(err, req, res, console.error('Code 8: ', err.stack));
    console.log(success);
    //Clear the cookie and redirect to login
    res.clearCookie('User');
    res.redirect('/');
  })
}

exports.products = (req, res) => {
  //Fetch the items from the DB and pass them to the view for rendering.
  displayItems((err, items) => {
    if (err) return error.server('err', req, res, console.error('Code 9: ', err.stack));
    res.status(200).render('products', { activePage: { products: true }, items });
  })
}

exports.cart = (req, res) => {
  const userId = jwtDecode(req.cookies.User).user_id;
  showCart(userId, (err, items) => {
    if (err) return error.server('err', req, res, console.error('Code 10: ', err.stack));
    res.status(200).render('cart', { items });
  })
}

// Adds items to the cart when user clicks on the "Add to Cart" button on /auth/products page.
exports.add = (req, res) => {
  const userId = jwtDecode(req.cookies.User).user_id;
  const itemId = JSON.parse(req.body);
  addItem(userId, itemId, (err, success) => {
    if (err) return error.server('err', req, res, console.error('Code 11: ', err.stack));
    res.sendStatus(200);
  });
}

exports.history = (req, res) => {
  //Decode the JWT and extract relevant informations.
  const decoded = jwtDecode(req.cookies.User);
  const username = decoded.username;
  const userId = decoded.user_id;

  //Get all the transactions performed by this user and pass the data to the view.
  showHistory(userId, (err, transactions) => {
    if (err) return error.server('err', req, res, console.error('Code 12: ', err.stack));

    //Get the account balance of that user to be rendered by the view.
    getBalance(userId, (err, result) => {
      if (err) return error.server('err', req, res, console.error('Code 13: ', err.stack));
      // Finally, send all the data to be rendered by the view.
      const amount = result[0].balance;
      res.status(200).render('history',
      { activePage: { products: true }, username, transactions, amount});
    })
  })
}
