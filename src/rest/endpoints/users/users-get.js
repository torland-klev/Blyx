//Import database
const { pool } = require('../../../config/globals');

const userGetRequest = (req, res) => {
  const url = req._parsedUrl.pathname;
  if (url == '/api/users'){

    let id = parseInt(req.query.id);
    //Display singular user
    if (id) {
      pool.query('SELECT * FROM users WHERE (user_id = $1)', [id], (error, result) => {
        let links = [];
        links.push({'info': 'Display all users', 'href': '/users', 'type': 'GET'});
        links.push({'info': 'Post a new user', 'href': '/users', 'type': 'POST', 'params': 'email, family_name, given_name, phone_number'});
        if (error) {
          res.status(404).json({
            info: 'User not found',
            links: links,
          })
        } else {
          res.status(200).json({
            info: 'Displaying singular user with user_id ' + id,
            user: result.rows[0],
            links: links,
          });
        }
      });
    }

    //Display all users
    else {
      //Page config
      let page = parseInt(req.query.p);
      const perPage = 10;
      if(page < 1 || !page) page = 1;
      const offset = perPage * page - perPage;

      //Query for all users with a limit and offset, based on current page.
      pool.query('SELECT * FROM users LIMIT $1 OFFSET $2', [perPage, offset], (error, result) => {
        if (error){
          res.status(400).json({
            info: 'Something went wrong',
            error: error
          });
        } else {

          //Return-object
          const returnJson = {
            message: 'This is a list of all users, limited to 10 at a time.',
            page: page,
            users: result.rows,
            links: [],
          };

          //Add helpful links to return object
          const nextPage = {'info': 'Next page', 'pagenr': (page+1), 'href': '/users?p=' + (page+1), 'type': 'GET'};
          const prevPage = {'info': 'Previous page', 'pagenr': (page-1), 'href': '/users?p=' + (page-1), 'type': 'GET'};

          //Conditionals for adding page-links
          if (page > 1) returnJson.links.push(prevPage);
          if (result.rows.length >= perPage) returnJson.links.push(nextPage);

          res.status(200).json(returnJson);
        }
      });
    }
  } else {
    res.status(404).json({
      info: 'Error: Site not found.'
    })
  }
}

module.exports = {
  userGetRequest,
};
