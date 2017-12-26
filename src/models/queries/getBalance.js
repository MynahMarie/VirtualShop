const dBConnect = require('./../../db/db_connection');

const getBalance = (user_id, cb) => {
  dBConnect.query(
    `SELECT balance FROM users WHERE id = $1`,
    [user_id],
    (err, res) => {
      if (err) return cb(err);
      else cb(null, res.rows);
    }
  )
}

module.exports = getBalance;
