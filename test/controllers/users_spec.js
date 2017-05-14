const {api, expect} = require('../spec_helper');
const User = require('../../models/user');

describe('Users and Auth test block', () => {

  describe('POST /api/register', () => {
    let gUser;

    beforeEach(done => {
      clearUsers(done);
    });
    afterEach(done => {
      clearUsers(done);
    });

    beforeEach(done => {
      User
        .create({
          'username': 'blah',
          'email': 'blah@blah.com',
          'password': 'password',
          'passwordConfirmation': 'password'
        })
        .then(user => {
          gUser = user;
        })
        .catch(done);
    });

    it('should create a user and return a 201 response', function(done) {
      done();
    });

  });

});

function clearUsers(done) {
  User
    .remove()
    .then(() => done())
    .catch(done);
}
