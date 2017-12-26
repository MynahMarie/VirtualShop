exports.client = (req, res) => {
  res.status(404).render('error', {
    layout: 'error',
    statusCode: 404,
    errorMessage: 'Sorry, I can\'t find what you\'re looking for...',
  });
};

exports.server = (err, req, res, next) => {
  console.error(err.stack);
  if (err === 'err') {
    err = 'Oh NOOoo... SoMEtHinG BrOKe...'
  }
  res.status(500).render('error', {
    layout: 'error',
    statusCode: 500,
    errorMessage: err,
  });
};
