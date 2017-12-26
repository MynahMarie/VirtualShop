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

const showCart = (user_id, cb) => {
  dBConnect.query(
    `SELECT * FROM items INNER JOIN cart ON
		items.id = cart.item_id WHERE cart.user_id = $1`,
    [user_id],
    (error, result) => {
      if (error) {
        cb(error);
      }
      cb(null, result.rows);
    }
  );
};

module.exports = {
  addItem,
  deleteCart,
  showCart
}
