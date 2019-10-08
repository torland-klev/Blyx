const Pool = require('pg').Pool

//Place these in a config file before deployment.
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blux',
  password: 'hquas13ta277',
  port: 5432,
});

exports.userPostRequest = function(req, res) {
  const url = req._parsedUrl.pathname;

  if (url == '/api/users'){
    let { email, family_name, given_name, phone} = req.body;
    console.log(email, family_name, given_name, phone);
    res.status(200).json({
      message: 'ok',
    })
  }
}
