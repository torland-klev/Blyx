//Import database
const { pool } = require('../../../config/globals');

const userPostRequest = (req, res) => {
  const url = req._parsedUrl.pathname;

  if (url == '/api/users'){
    let { email, family_name, given_name, phone_number} = req.body;
    console.log(email, family_name, given_name, phone_number);
    pool.query('INSERT INTO users (email, family_name, given_name, phone_number) VALUES ($1, $2, $3, $4) RETURNING user_id', [email, family_name, given_name, phone_number], (error, result) => {
       if (error) {
         if (error.constraint === "unique_email"){
           res.status(403).json({
             error: 'Email already in use.',
           });
         }
         else if(error.constraint === 'proper_email'){
           res.status(403).json({
             error: 'Not a valid email.',
           });
         }
         else if(error.constraint === 'unique_phone_number'){
           res.status(403).json({
             error: 'Phone number already in use.',
           });
         }
         else {
           res.status(500).json({
             error: error,
             body: req.body
           });
         }
       }
       else {
         res.status(201).json({
           userId: result.rows[0].user_id,
           email: email,
           message: 'Account successfully created with ID: ' + result.rows[0].user_id + '.',
       })
     }
    });
  }
  else {
    res.status(404).json({
      error: 'Site not found.'
    })
  }
}

module.exports = {
  userPostRequest,
};
