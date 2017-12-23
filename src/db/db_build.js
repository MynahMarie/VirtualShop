const fs = require('fs');
const dbConnect = require('./db_connection');

let sql;

if (process.env.NODE_ENV === 'test') {
  sql = fs.readFileSync(`${__dirname}/test_db_build.sql`).toString();
} else {
  sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();
}

const runDbBuild = cb => {
  dbConnect.query(sql, (err, res) => {
    if (err) return cb(err);
    cb(null, res);
  });
}

module.exports = runDbBuild;
