const {api, expect} = require('../spec_helper');
const User = require('../../models/user');

describe('Users and Auth test block', () => {
  let myToken;
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

  }); // end of POST /api/register block

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

  }); // end of POST /api/login block

  describe('GET /api/users', () => {

    beforeEach(done => {
      api.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: gUser.email,
          password: 'password'
        })
        .end((err, res) => {
          myToken = res.body.token;
          done();
        });
    });

    it('should return an array of user objects with correct keys', function(done) {
      // this.skip();
      api.get('/api/users')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+myToken)
        .then(res => {
          expect(res.body)
          .to.be.an('array');
          res.body.forEach(user => {
            expect(user)
            .to.have.all.keys([
              'username',
              'email',
              '_id'
            ]);
          });
          done();
        })
        .catch(done);

    });

  }); // end of GET /api/users block

  describe('GET /api/users/:id', () => {

    it('should return a single user object with correct keys', function(done) {
      // this.skip();
      console.log(gUser._id);
      api.get(`/api/users/${gUser._id}`)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+myToken)
        .then(res => {
          expect(res.body)
          .to.have.all.keys([
            'username',
            'email',
            '_id'
          ]);
          done();
        })
        .catch(done);
    });

    it('should not return a user is the id is wrong', function(done) {
      // this.skip();
      console.log(gUser._id);
      api.get('/api/users/56cb91bdc3464f14678934ca')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+myToken)
        .then(res => {
          expect(res.status)
          .to.eq(404);
          done();
        })
        .catch(done);
    });

  }); // end of GET /api/users/:id block

});

function clearUsers(done) {
  User
    .remove()
    .then(() => done())
    .catch(done);
}
