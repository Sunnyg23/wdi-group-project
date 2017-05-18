const User = require('../models/user');

function usersIndex(req, res, next) {
  User
    .find()
    .exec()
    .then(users => {
      return res.status(200).json(users);
    })
    .catch(next);
}

function usersShow(req, res, next) {
  User
    .findById(req.params.id)
    .populate('recipes')
    .exec()
    .then(user => {
      if(!user) return res.notFound();
      return res.status(200).json(user);
    })
    .catch(next);
}

function usersUpdate(req, res, next) {
  User
    .findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then(user => {
      console.log(!user);
      console.log('User above');
      console.log(req.params);
      console.log('req.params above above');
      console.log(req.body);
      console.log('Req.body above');
      if(!user) return res.notFound();
      return res.status(201).json(user);
    })
    .catch(next);
}

function usersDelete(req, res, next) {
  User
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      return res.status(204).json({message: 'Deleted!'});
    })
    .catch(next);
}

module.exports = {
  index: usersIndex,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete
};
