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

  beforeEach(done => {
    User
      .create({
        'username': 'blah',
        'email': 'blah@blah.com',
        'password': 'password',
        'passwordConfirmation': 'password'
      })
      .then(user => {
        // console.log(user.username+' created');
        done();
      });
  });

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

  describe('POST /api/login', () => {

    it('should log in then return a 200 and user object with all keys', function(done) {
      // this.skip();
      api.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: 'blah@blah.com',
          password: 'password'
        })
        .then(res => {
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
        })
        .catch(done);
    });

  });

});

function clearUsers(done) {
  User
    .remove()
    .then(() => done())
    .catch(done);
}
