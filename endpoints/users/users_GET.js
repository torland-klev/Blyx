const Pool = require('pg').Pool

//Place these in a config file before deployment.
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blux',
  password: 'hquas13ta277',
  port: 5432,
});


exports.userGetRequest = function(req, res) {
  const url = req._parsedUrl.pathname;

  if (url == '/api/users'){

    let page = parseInt(req.query.p);
    const perPage = 10;
    if(page < 1 || !page) page = 1;
    const offset = perPage * page - perPage;

    pool.query('SELECT * FROM users LIMIT $1 OFFSET $2', [perPage, offset], (error, result) => {
      if (error){
        res.status(400).json({
          message: 'Something went wrong',
          error: error
        });
      } else {

        res.status(200).json({
          message: 'This is a list of all users, limited to 10 at a time.'
                    +' Currently showing users ' + (offset+1)
                    +' to ' + (Math.min(result.rows.length, (offset + perPage))) + '.',
          page: page,
          links: {
            prevPage: {'href': '/users?p=' + (page+1), 'type': 'GET'},
            nextPage: {'href': '/users?p=' + (page-1), 'type': 'GET'},
          },
          users: result.rows,
        })
      }
    });
  } else {
    res.status(404).json({
      error: 'Site not found.'
    })
  }
}
