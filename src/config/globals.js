const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blux',
  password: 'hquas13ta277',
  port: 5432,
});

const logTools = {
  seperator: '-------------------------------------------------------------',
};

module.exports = {
  pool,
  logTools,
};
