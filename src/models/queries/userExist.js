const dBConnect = require('./../../db/db_connection');

const userExist = (arr, cb) => {
	dBConnect.query(`SELECT id,username FROM users WHERE username=$1 AND password=$2`,
		[arr[0], arr[1]],
    (error, result) => {
			if(error){
				cb(error);
			} else if (result.rowCount === 0) {
        cb(null, 'No Match Found');
      } else {
        cb(null, result.rows);
      }
		});
};


module.exports = userExist;
