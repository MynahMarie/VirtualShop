const dBConnect = require('./../../db/db_connection');

const showHistory = (user_id, cb) => {
  //First
  dBConnect.query(
    `SELECT transactions.id,transactions.item_id,items.name,items.price,transactions.t_time
    FROM transactions,items WHERE user_id = $1 AND transactions.item_id = items.id
    ORDER BY t_time DESC LIMIT 25`,
    [user_id],
    (err, result) => {
      if (err) {
        console.log(err);
        return cb(err);
      }
      else if (result.rowCount === 0) {
        return cb(null, 'No Transactions');
      } else {
        // console.log('inside history query: ', result.rows)
        cb(null, result.rows);
      }
    }
  );
};

module.exports = showHistory;
