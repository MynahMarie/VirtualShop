const dBConnect = require('./../../db/db_connection');
const bcrypt = require('bcryptjs');

const userExist = (str, cb) => {
	dBConnect.query(`SELECT id,username,hash FROM users WHERE username=$1`,
		[str],
    (error, result) => {
			if(error){
				return cb(error);
			} else if (result.rowCount === 0) {
        return cb(null, 'No Match Found');
      } else {
        console.log('Results from query userExist: ', result.rows);
        cb(null, result.rows);
      }
		});
};


module.exports = userExist;
