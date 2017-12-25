exports.logout = (req, res) => {
  //Clear the cookie and redirect to login
  res.clearCookie('User');
  res.redirect('/');
}

exports.products = (req, res) => {
  console.log('Cookies on products are: ', req.cookies['User']);
  res.status(200).render('products', { activePage: { buy: true }});
}

exports.cart = (req, res) => {
  res.send('NOT YET IMPLEMENTED : cart');
}

exports.history = (req, res) => {
  res.send('NOT YET IMPLEMENTED : profile / history');
}
