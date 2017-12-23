const dBConnect = require('./../../db/db_connection');

const showHistory = (user_id, cb) => {
  //First
  dBConnect.query(
    `SELECT id,t_time FROM user_transactions WHERE user_id = $1`,
    [user_id],
    (err, result) => {
      if (err) {
        console.log(err);
        return cb(err);
      }
      else if (result.rowCount === 0) {
        return cb(null, 'No Transactions');
      } else {
        const transactions = result.rows.id;
        transactions.forEach(trans => {
          dBConnect.query(
            `SELECT transaction_items.item_id,items.name FROM transaction_items,items
            WHERE transaction_id = $1 AND items.id=transaction_items.item_id`,
            [trans],
            (err, result) => {
              if (err) {
                console.log(err);
                return cb(err);
              } else if (result.rowCount === 0) {
                return cb(null, 'No Transactions');
              } else {
                // console.log(result);
                return cb(null, result);
              }
            }
          );
        });
      }
    }
  );
};

module.exports = showHistory;
