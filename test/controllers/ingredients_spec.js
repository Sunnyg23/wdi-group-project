const {api, expect} = require('../spec_helper');
const Ingredient = require('../../models/ingredient');
const User = require('../../models/user');

describe('Ingredients controllers tests', () => {
  let ingredientId;
  let gUser;
  let myToken;

  beforeEach(done => {
    User
      .remove()
      .then(() => {
        Ingredient
          .remove()
          .then(() => done())
          .catch(done);
      })
      .catch(done);
  });
  afterEach(done => {
    User
      .remove()
      .then(() => {
        Ingredient
          .remove()
          .then(() => done())
          .catch(done);
      })
      .catch(done);
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

        return Ingredient
          .create({
            name: 'Gefilte Fish',
            images: {
              small: '',
              large: '',
              others: ['']
            }
          });
      })
      .then(ingredient => {
        ingredientId = ingredient._id;
        // done();
        api.post('/api/login')
          .set('Accept', 'application/json')
          .send({
            email: gUser.email,
            password: 'password'
          })
          .end((err, res) => {
            if(err) console.log(err);
            myToken = res.body.token;
          });

        done();
      })
      .catch(done);
  });

  describe('GET /api/ingredients', () => {

    it('should return a 200 response', function(done) {
      this.skip();
      api.get('/api/ingredients')
      .set('Accept', 'application/json')
      // .set('Authorization', 'Bearer '+myToken)
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.status).to.eq(200);
        done();
      });
    });

    it('should return an JSON object', function(done) {
      this.skip();
      api.get('/api/ingredients')
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.headers['content-type'])
          .to.be.eq('application/json; charset=utf-8');
          done();
        });
    });

    it('should return an array of objects', function(done) {
      this.skip();
      api.get('/api/ingredients')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.body).to.be.an('array');
        done();
      });
    });

  }); // end of GET /api/ingredients

  describe('GET /api/ingredients/:id', () => {

    it('should return a 200 response', function(done) {
      this.skip();
      api.get(`/api/ingredients/${ingredientId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.status).to.eq(200);
        done();
      });
    });

    it('should return a single object', function(done) {
      this.skip();
      api.get(`/api/ingredients/${ingredientId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.headers['content-type'])
        .to.be.eq('application/json; charset=utf-8');
        done();
      });
    });

    it('should return an object with required keys', function(done) {
      this.skip();
      api.get(`/api/ingredients/${ingredientId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.body)
        .to.have.all.keys([
          'name',
          'images',
          '_id',
          '__v'
        ]);
        done();
      });
    });

    it('should not return an object if the id is wrong', function(done) {
      this.skip();
      api.get('/api/ingredients/56cb91bdc3464f14678934ca')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.status).to.eq(404);
        done();
      });
    });

  }); // end of GET /api/ingredients/:id block

  describe('POST /api/ingredients - new route', () => {

    it('should return a 201 response', function(done) {
      // this.skip();
      api.post('/api/ingredients')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+myToken)
      .send({
        name: 'Gefilte Fish',
        images: {
          small: '',
          large: '',
          others: ['']
        }
      })
      .expect(201, done);
    });

    it('should return the created json object', function(done) {
      // this.skip();
      api.post('/api/ingredients')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+myToken)
      .send({
        name: 'Gefilte Fish',
        images: {
          small: '',
          large: '',
          others: ['']
        }
      })
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.body)
        .to.have.all.keys([
          'name',
          'images',
          '_id',
          '__v'
        ]);
        done();
      });
    });

    it('should return created object with correct keys', function(done) {
      // this.skip();
      api.post('/api/ingredients')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+myToken)
      .send({
        name: 'Gefilte Fish',
        images: {
          small: '',
          large: '',
          others: ['']
        }
      })
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.headers['content-type'])
        .to.eq('application/json; charset=utf-8');
        done();
      });
    });

    it('should return 500 error if vaildation fails, empty object, name required', function(done) {
      // this.skip();
      api.post('/api/ingredients')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+myToken)
      .send({

      })
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.status).to.eq(500);
        expect(res.body.name)
        .to.eq('ValidationError');
        done();
      });
    });

  }); // end of POST /api/ingredients - new route

  describe('PUT /api/ingredients - edit route', () => {

    it('should return a 201 response', function(done) {
      // this.skip();
      api.put(`/api/ingredients/${ingredientId}`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+myToken)
      .send({
        name: 'name changed',
        images: {
          small: '',
          large: '',
          others: ['']
        }
      })
      .expect(201, done);
    });

    it('should return the created json object', function(done) {
      // this.skip();
      api.put(`/api/ingredients/${ingredientId}`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+myToken)
      .send({
        name: 'name changed',
        images: {
          small: '',
          large: '',
          others: ['']
        }
      })
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.body)
        .to.have.all.keys([
          'name',
          'images',
          '_id',
          '__v'
        ]);
        done();
      });
    });

    it('should return created object with correct keys', function(done) {
      // this.skip();
      api.put(`/api/ingredients/${ingredientId}`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+myToken)
      .send({
        name: 'name changed',
        images: {
          small: '',
          large: '',
          others: ['']
        }
      })
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.headers['content-type'])
        .to.eq('application/json; charset=utf-8');
        done();
      });
    });

    it('should return a 404 response if the id is wrong', function(done) {
      // this.skip();
      api.put(`/api/ingredients/56cb91bdc3464f14678934ca`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+myToken)
      .send({
        name: 'name changed',
        images: {
          small: '',
          large: '',
          others: ['']
        }
      })
      .expect(404, done);
    });

  }); // end of PUT /api/ingredients - edit route

  describe('DELETE /api/ingredients/:id', () => {

    it('should return a 204 response after deleting', function(done) {
      // this.skip();
      api
        .delete(`/api/ingredients/${ingredientId}`)
        .set('Authorization', 'Bearer '+myToken)
        .set('Accept', 'application/json')
        .expect(204, done);
    });

  }); // end of DELETE /api/ingredients/:id block

});
