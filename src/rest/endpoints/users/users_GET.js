//Import database
const { pool } = require('../../../config/globals');

const userGetRequest = (req, res) => {
  const url = req._parsedUrl.pathname;
  if (url == '/api/users'){

    //Page config
    let page = parseInt(req.query.p);
    const perPage = 10;
    if(page < 1 || !page) page = 1;
    const offset = perPage * page - perPage;

    //Query for all users with a limit and offset, based on current page.
    pool.query('SELECT * FROM users LIMIT $1 OFFSET $2', [perPage, offset], (error, result) => {
      if (error){
        res.status(400).json({
          message: 'Something went wrong',
          error: error
        });
      } else {

        const nextPage = {'nr': (page+1), 'href': '/users?p=' + (page+1), 'type': 'GET'};
        const prevPage = {'nr': (page-1), 'href': '/users?p=' + (page-1), 'type': 'GET'};

        const links = {};
        if (page > 1) links.prevPage = prevPage;
        if (result.rows.length >= perPage) links.nextPage = nextPage;

        const returnJson = {
          message: 'This is a list of all users, limited to 10 at a time.'
                  +' Currently showing users ' + (offset+1)
                  +' to ' + (Math.min(result.rows.length, (offset + perPage))) + '.',
          page: page,
          users: result.rows,
          links: links,
        };

        res.status(200).json(returnJson);
      }
    });
  } else {
    res.status(404).json({
      error: 'Site not found.'
    })
  }
}

module.exports = {
  userGetRequest,
};
