const runDbBuild = require('./../src/db/db_build');

runDbBuild((err, res) => {
  if (err) throw err;
  console.log('DB build successful');
});
