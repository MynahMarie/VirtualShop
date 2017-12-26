const dBConnect = require('./../../db/db_connection');
const bcrypt = require('bcryptjs');

const createUser = (arr, cb) => {
  dBConnect.query(
    `INSERT INTO users(username, firstname, lastname, email, hash)
    VALUES($1,$2,$3,$4,$5) RETURNING id`,
    [arr[0], arr[2], arr[3], arr[4], arr[1]],
    (error, result) => {
      if (error) {
        return cb(error);
      }
      cb(null, result.rows[0].id);
    }
  );
};

module.exports = createUser;
