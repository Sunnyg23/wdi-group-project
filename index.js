const express    = require('express');
const router     = require('./config/routes');
const morgan     = require('morgan');
const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const cors       = require('cors');
const expressJWT = require('express-jwt');
const env        = require('./config/env');
const errorHandler = require('./lib/errorHandler');
const customResponses = require('./lib/customResponses');
const app        = express();
const dest       = `${__dirname}/public`;

app.use(express.static(dest));
mongoose.connect(env.db[process.env.NODE_ENV]);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', expressJWT({ secret: env.secret })
  .unless({
    path: [
      { url: '/api/register', methods: ['POST'] },
      { url: '/api/login',    methods: ['POST'] }
    ]
  }));
app.use(jwtErrorHandler);

function jwtErrorHandler(err, req, res, next){
  if (err.name !== 'UnauthorizedError') return next();
  return res.status(401).json({ message: 'Unauthorized request.' });
}

app.use(customResponses);
app.use('/api', router);
app.get('/*', (req, res) => res.sendFile(`${dest}/index.html`));
app.use(errorHandler);

app.listen(env.port, () => console.log(`Express has started on port: ${env.port}`));

module.exports = app;
