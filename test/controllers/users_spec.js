const {api, expect} = require('../spec_helper');
const User = require('../../models/user');

describe('Users and Auth test block', () => {

  let gUser;

  beforeEach(done => {
    clearUsers(done);
  });
  afterEach(done => {
    clearUsers(done);
  });

  // beforeEach(done => {
  //   User
  //     .create({
  //       'username': 'blah',
  //       'email': 'blah@blah.com',
  //       'password': 'password',
  //       'passwordConfirmation': 'password'
  //     })
  //     .then(user => {
  //       gUser = user;
  //     })
  //     .catch(done);
  // });

  describe('POST /api/register', () => {

    it('should create a user and return 201 and user object with all keys', function(done) {
      // this.skip();
      api.post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'test',
          email: 'test@test.com',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end((err, res) => {
          if(err) console.log('Error: '+err);
          console.log(res.body.user);
          expect(res.body)
          .to.have.all.keys([
            'message',
            'user',
            'token'
          ]);
          expect(res.body.user)
          .to.have.all.keys([
            'username',
            'email',
            '_id'
          ]);
          done();
        });
    });

  });

});

function clearUsers(done) {
  User
    .remove()
    .then(() => done())
    .catch(done);
}
