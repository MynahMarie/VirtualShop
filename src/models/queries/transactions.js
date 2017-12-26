const dBConnect = require('./../../db/db_connection');

const transactions = (user_id, item_id, cb) => {
  dBConnect.query(
    `INSERT INTO transactions(user_id, item_id, t_time)
    VALUES($1,$2, current_timestamp)`,
    [user_id, item_id],
    (err, success) => {
      if (err) return cb(err);
      cb(null, 'new transaction added');
    }
  )
}

module.exports = transactions;
