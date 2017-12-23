const runDbBuild = require('./db_build');

runDbBuild((err, res) => {
  if (err) throw err;
  console.log('DB build successful');
});
