exports.home = (req, res) => {
  res.render('home', { activePage: { home: true }});
}
