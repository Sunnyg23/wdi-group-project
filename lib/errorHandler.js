const env = require('../config/env');

function errorHandler(err, req, res, next) {
  err.status = err.status || 500;
  err.message = err.message || 'Internal server error';
  if(process.env.NODE_ENV === 'production') delete err.stack;

  res.status(err.status);
  // res.locals.err = err;

  return res.json(err);
}

module.exports = errorHandler;
