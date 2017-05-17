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
            'recipes',
            'email',
            '_id'
          ]);
          done();
        });
    });

    it('should fail validation if email is not valid', function(done) {
      // this.skip();
      api.post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'test',
          email: 'not-an-email',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .end((err, res) => {
          if(err) console.log('Error: '+err);

          expect(res.status).to.eq(500);
          expect(res.body.message)
          .to.eq('User validation failed');
          expect(res.body.errors).to.have.keys(['email']);
          expect(res.body.errors['email'].message)
          .to.eq('must be a valid email address');
          done();
        });
    });

    it('should fail validation if password not entered at all', function(done) {
      // this.skip();
      api.post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'test',
          email: 'test@test.com',
          password: '',
          passwordConfirmation: ''
        })
        .end((err, res) => {
          if(err) console.log('Error: '+err);

          expect(res.status).to.eq(500);
          expect(res.body.message)
          .to.eq('User validation failed');
          expect(res.body.errors).to.have.keys(['password']);
          expect(res.body.errors['password'].message)
          .to.eq('A password is required.');
          done();
        });
    });

    it('should fail validation if password is less than 6 chars', function(done) {
      // this.skip();
      api.post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'test',
          email: 'test@test.com',
          password: 'pass',
          passwordConfirmation: 'pass'
        })
        .end((err, res) => {
          if(err) console.log('Error: '+err);

          expect(res.status).to.eq(500);
          expect(res.body.message)
          .to.eq('User validation failed');
          expect(res.body.errors).to.have.keys(['password']);
          expect(res.body.errors['password'].message)
          .to.eq('must be at least 6 characters.');
          done();
        });
    });

    it('should fail validation if passwords do not match', function(done) {
      // this.skip();
      api.post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'test',
          email: 'test@test.com',
          password: 'password',
          passwordConfirmation: 'passwerd'
        })
        .end((err, res) => {
          if(err) console.log('Error: '+err);

          expect(res.status).to.eq(500);
          expect(res.body.message)
          .to.eq('User validation failed');
          expect(res.body.errors).to.have.keys(['passwordConfirmation']);
          expect(res.body.errors['passwordConfirmation'].message)
          .to.eq('Passwords do not match.');
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
            'recipes',
            'email',
            '_id'
          ]);
          done();
        })
        .catch(done);
    });

    it('should fail to find a user if email is not valid', function(done) {
      // this.skip();
      api.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: 'not-an-email',
          password: 'password'
        })
        .then(res => {
          expect(res.status).to.eq(404);
          done();
        })
        .catch(done);
    });

    it('should fail to log in if password is not valid', function(done) {
      // this.skip();
      api.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: 'blah@blah.com',
          password: 'passwerd'
        })
        .then(res => {

          expect(res.status).to.eq(401);
          expect(res.body.message)
          .to.eq('Unauthorized.');
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
              'recipes',
              'email',
              '_id'
            ]);
          });
          done();
        })
        .catch(done);
    });

    it('should return 401 if not logged in', function(done) {
      api.get(`/api/users`)
      .set('Accept', 'application/json')
      // .set('Authorization', 'Bearer '+myToken)
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.status)
        .to.eq(401);
        done();
      });
    });

  }); // end of GET /api/users block

  describe('GET /api/users/:id', () => {

    it('should return a single user object with correct keys', function(done) {
      // this.skip();
      api.get(`/api/users/${gUser._id}`)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+myToken)
        .then(res => {
          expect(res.body)
          .to.have.all.keys([
            'username',
            'recipes',
            'email',
            '_id'
          ]);
          done();
        })
        .catch(done);
    });

    it('should not return a user is the id is wrong', function(done) {
      // this.skip();
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

    it('should return 401 if not logged in', function(done) {
      api.get(`/api/users/${gUser._id}`)
      .set('Accept', 'application/json')
      // .set('Authorization', 'Bearer '+myToken)
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.status)
        .to.eq(401);
        done();
      });
    });

  }); // end of GET /api/users/:id block

  describe('PUT /api/users/:id', () => {

    it('should return update user and return object with correct keys', function(done) {
      // this.skip();
      api.put(`/api/users/${gUser._id}`)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+myToken)
        .send({
          username: 'louis'
        })
        .then(res => {
          expect(res.body)
          .to.have.all.keys([
            'username',
            'recipes',
            'email',
            '_id'
          ]);
          done();
        })
        .catch(done);
    });

    it('should return update user and return object with new values', function(done) {
      this.skip();
      api.put(`/api/users/${gUser._id}`)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+myToken)
        .send({
          username: 'louis'
        })
        .then(res => {
          expect(res.body.username)
          .to.eq('louis');
          done();
        })
        .catch(done);
    });

    it('should return not update user if id is wrong', function(done) {
      // this.skip();
      api.put(`/api/users/56cb91bdc3464f14678934ca`)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+myToken)
        .send({
          username: 'louis'
        })
        .then(res => {
          expect(res.status)
          .to.eq(404);
          done();
        })
        .catch(done);
    });

    it('should return 401 if not logged in', function(done) {
      api.put(`/api/users/${gUser._id}`)
      .set('Accept', 'application/json')
      // .set('Authorization', 'Bearer '+myToken)
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.status)
        .to.eq(401);
        done();
      });
    });

  }); // end of PUT /api/users/:id block

  describe('DELETE /api/users/:id', () => {

    it('should return a 204 response', function(done) {
      // this.skip();
      api.delete(`/api/users/${gUser._id}`)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+myToken)
        .then(res => {
          expect(res.status)
          .to.eq(204);
          done();
        })
        .catch(done);
    });

    it('should return 401 if not logged in', function(done) {
      api.delete(`/api/users/${gUser._id}`)
      .set('Accept', 'application/json')
      // .set('Authorization', 'Bearer '+myToken)
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.status)
        .to.eq(401);
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
