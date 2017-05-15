const User   = require('../models/user');
const jwt    = require('jsonwebtoken');
const config = require('../config/env');

function authenticationsRegister(req, res, next) {
  User
    .create(req.body)
    .then(user => {
      const token = jwt.sign(user._id, config.secret, { expiresIn: 60*60*24 });
      return res.status(201).json({
        message: `Welcome ${user.username}!`,
        user,
        token
      });
    })
    .catch(next);

}

function authenticationsLogin(req, res, next) {
  User
    .findOne({email: req.body.email})
    .exec()
    .then(user => {
      if(!user) return res.notFound();
      if(!user.validatePassword(req.body.password)) return res.status(401).json({ message: 'Unauthorized.' });
      const token = jwt.sign(user._id, config.secret, { expiresIn: 60*60*24 });
      return res.status(200).json({
        message: 'Welcome back.',
        user,
        token
      });
    })
    .catch(next);
}

module.exports = {
  register: authenticationsRegister,
  login: authenticationsLogin
};
