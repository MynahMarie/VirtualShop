const dbConnect = require('./../../db/db_connection');

const displayItems = (cb) => {
  dbConnect.query(
    `SELECT * FROM items`,
    (err, res) => {
      if (err) {
        return cb(err)
      } else {
        return cb(null, res.rows)
      }
    }
  )
};

module.exports = displayItems;
