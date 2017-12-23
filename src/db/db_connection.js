const { Pool } = require('pg');

const url = require('url');
require('env2')('config.env');

let DB_URL = process.env.DB_URL;

if (process.env.NODE_ENV === 'test') {
  DB_URL = process.env.TEST_DB_URL;
}

if (!DB_URL) {
  throw new Error('ENV variable DB_URL was NOT SET!!');
}

const pool = new Pool({
  connectionString: DB_URL
});

const params = url.parse(DB_URL);

const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.DB_MAX_CONNECTIONS || 2,
  user: params.auth.split(':')[0],
  password: params.auth.split(':')[1]
};

options.ssl = options.host !== 'localhost';
module.exports = new Pool(options);
