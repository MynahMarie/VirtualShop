const connection = require('./../../db/db_connection');

const createUser = (username, firstname, lastname, address, password, cb) => {
  connection.query(
    `INSERT INTO users(username, firstname, lastname,address, password)
		VALUES($1,$2,$3,$4,$5) RETURNING id`,
    [username, firstname, lastname, address, password],
    (error, result) => {
      if (error) {
        cb(error);
      }
      cb(null, result.rows);
    }
  );
};

module.exports = createUser;
