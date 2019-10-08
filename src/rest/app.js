/*
 * DEPENDENCIES
 *
 * Express:
 *  A fast, inopinionated, minimalist web framework for Node.js.
 *  Express is what is the hearth of the web-server, and is the framework
 *  used for handling all traffic (i.e., HTTP-requests).
 *
 * Morgan:
 *  Morgan is a logger middleware-function that logs all events.
 *
 * PG:
 *  Node-Postgres is a collection of node.js modules for interfacing with the
 *  PostgreSQL database.
 *
 *
 * DEV-DEPENDENCIES
 *
 * Nodemon:
 *  Used for auto-reloading the server after a change has been made.
 */

const express = require('express');
const app = express();
const morgan = require('morgan');
//const { userGetRequest, userPostRequest } = require('./endpoints/users');
const { userPostRequest } = require('./endpoints/users/users_POST');
const { userGetRequest } = require('./endpoints/users/users_GET');

// Dependency MORGAN
app.use(morgan('dev'));
app.use(express.json());

// Allow CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS'){
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, POST, PATCH, DELETE, GET'
    );
    return res.status(200).json({});
  }
  next();
});

//Homepage
app.get('/', (req, res, next) => {
  res.status(200).json({
    info: 'This will be the homepage for the website. To explore the backend, go to /api',
    requestBody: req.body
  });
});
//API
app.get('/api', (req, res, next) => {
  res.status(200).json({
    info: 'Node.js, Express, and PostgreSQL RESTful API for the application BLYX',
    endpoints: {
      get: [
        'users',
        'profiles'
      ],
      post: [
        'users',
        'profiles'
      ]
    },
    requestBody: req.body
  });
});

app.post('/api', (req, res, next) => {
  res.status(200).json({
    info: 'Node.js, Express, and PostgreSQL RESTful API',
    requestBody: req.body
  });
});

//Users
app.get('/api/users*', userGetRequest);
app.post('/api/users*', userPostRequest);

//Failsafe
app.use(function(req, res){
  res.status(404).json({
    info: 'Site not found',
  });
});

module.exports = app;
