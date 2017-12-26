const error = require('./error');
const displayItems = require('./../models/queries/displayItems');
const showHistory = require('./../models/queries/showHistory');
const getBalance = require('./../models/queries/getBalance');
const transactions = require('./../models/queries/transactions');
const { addItem, deleteCart, getCart, deleteItem, buy } = require('./../models/queries/cart');

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
  getCart(userId, (err, items) => {
    if (err) return error.server('err', req, res, console.error('Code 10: ', err.stack));

    //Get the total amount of all items in the cart.
    let totalAmount = 0.00;
    if (items !== 'cart empty') {
      items.forEach(item => { totalAmount += parseFloat(item.price, 10); })
      //Return a rounded value to 2 decimal places.
      totalAmount = totalAmount.toFixed(2);
    }
    res.status(200).render('cart', { items, totalAmount });
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

exports.delete = (req, res) => {
  const itemId = JSON.parse(req.body);
  deleteItem(itemId, (err, success) => {
    if (err) return error.server('err', req, res, console.error('Code 14: ', err.stack));
    console.log(success);
    res.sendStatus(200);
  })
}

exports.buy = (req, res) => {
  const userId = jwtDecode(req.cookies.User).user_id;
  getCart(userId, (err, items) => {
    if (err) return error.server('err', req, res, console.error('Code 15: ', err.stack));
    let total = 0.00;
    items.forEach(row => { total += parseFloat(row.price, 10); });
    total = total.toFixed(2);
    buy(userId, total, (err, result) => {
      if (err) return error.server('err', req, res, console.error('Code 16: ', err.stack));
      // const accountBalance = result;
      console.log('buy results back: ', result);
      if (result === 'Not enough funds') {
        return res.status(403);
      }
      items.forEach(row => {
        transactions(userId, row.item_id, (err, done) => {
          if (err) return error.server('err', req, res, console.error('Code 18: ', err.stack))
          console.log(done);
        })
      })
      deleteCart(userId, (err, success) => {
        if (err) return error.server('err', req, res, console.error('Code 17: ', err.stack));
        console.log(success);
      })
    })
    res.status(200);
  })
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
      const amount = parseFloat(result[0].balance).toFixed(2);
      res.status(200).render('history',
      { activePage: { products: true }, username, transactions, amount});
    })
  })
}
