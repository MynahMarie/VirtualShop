const dBConnect = require('./../../db/db_connection');

const addItem = (user_id, item_id, cb) => {
  dBConnect.query(
    `INSERT INTO cart(user_id,item_id) VALUES($1,$2)`,
    [user_id, item_id],
    (error, success) => {
      if (error) {
        cb(error);
      }
      cb(null, 'item added to cart');
    }
  );
};

const deleteCart = (user_id, cb) => {
  dBConnect.query(
    `DELETE FROM cart WHERE user_id = $1`,
    [user_id],
    (error, result) => {
      if (error) {
        cb(error);
      }
      cb(null, 'cart successfully deleted');
    }
  );
};

const getCart = (user_id, cb) => {
  dBConnect.query(
    `SELECT * FROM items INNER JOIN cart ON
		items.id = cart.item_id WHERE cart.user_id = $1`,
    [user_id],
    (error, result) => {
      if (error) {
        return cb(error);
      } else if (result.rowCount === 0) {
        return cb(null, 'cart empty');
      }
      cb(null, result.rows);
    }
  );
};

const deleteItem = (row_id, cb) => {
  dBConnect.query(
    `DELETE FROM cart WHERE id=$1`,
    [row_id],
    (error, success) => {
      if (error) {
        cb(error);
      }
      cb(null, 'item successfully deleted from cart');
    }
  );
};

const buy = (user_id, total, cb) => {
  // Select the user's account balance.
  dBConnect.query(
    `SELECT balance FROM users WHERE id = $1`,
    [user_id],
    (err, res) => {
      if (err) return cb(err);
      const balance = parseFloat(res.rows[0].balance);
      total = parseFloat(total, 10);
      //If insufficient funds, return appropriate message.
      console.log(balance > total ? true : false);
      console.log(typeof(balance), typeof(total));
      if (balance < total) return cb(null, 'Not enough funds');
      //Update the user's account balance by substracting the cart total amount.
      //Return the user's new balance to be rendered in the front if we need it.
      const newBalance = balance - total;
      dBConnect.query(
        `UPDATE users SET balance = $1 WHERE id = $2 RETURNING balance`,
        [newBalance, user_id],
        (err, success) => {
          if (err) return cb(err)
          cb(null, parseFloat(res.rows[0].balance, 10).toFixed(2));
        }
      )
    }
  )
}

module.exports = {
  addItem,
  deleteCart,
  getCart,
  deleteItem,
  buy
}
