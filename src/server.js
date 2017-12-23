const app = require('./app');

app.listen(app.get('port'), () => {
  console.log(`The magic happens on port`, app.get('port'));
})
