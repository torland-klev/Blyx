//Import database
const { pool } = require('../../../config/globals');

const userPostRequest = (req, res) => {
  const url = req._parsedUrl.pathname;

  if (url == '/api/users'){
    let { email, family_name, given_name, phone} = req.body;
    console.log(email, family_name, given_name, phone);
    res.status(200).json({
      message: 'ok',
    })
  }
}

module.exports = {
  userPostRequest,
};
