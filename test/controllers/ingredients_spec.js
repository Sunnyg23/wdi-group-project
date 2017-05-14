const {api, expect} = require('../spec_helper');
const Ingredient = require('../../models/ingredient');

describe('Ingredients controllers tests', () => {
  let ingredientId;

  beforeEach(done => {
    Ingredient
      .remove()
      .then(() => done())
      .catch(done);
  });
  afterEach(done => {
    Ingredient
      .remove()
      .then(() => done())
      .catch(done);
  });

  beforeEach(done => {
    Ingredient
      .create({
        name: 'Gefilte Fish',
        images: {
          small: '',
          large: '',
          others: ['']
        }
      })
      .then(ingredient => {
        ingredientId = ingredient._id;
        done();
      })
      .catch(done);
  });

  describe('GET /api/ingredients', () => {

    it('should return a 200 response', function(done) {
      // this.skip();
      api.get('/api/ingredients')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.status).to.eq(200);
        done();
      });
    });

    it('should return an JSON object', function(done) {
      // this.skip();
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
      // this.skip();
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
      // this.skip();
      api.get(`/api/ingredients/${ingredientId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.status).to.eq(200);
        done();
      });
    });

    it('should return a single object', function(done) {
      // this.skip();
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
      // this.skip();
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
      // this.skip();
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
      api.post('/api/ingredients')
      .set('Accept', 'application/json')
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
      api.post('/api/ingredients')
      .set('Accept', 'application/json')
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
      api.post('/api/ingredients')
      .set('Accept', 'application/json')
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
      api.post('/api/ingredients')
      .set('Accept', 'application/json')
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
      api.put(`/api/ingredients/${ingredientId}`)
      .set('Accept', 'application/json')
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
      api.put(`/api/ingredients/${ingredientId}`)
      .set('Accept', 'application/json')
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
      api.put(`/api/ingredients/${ingredientId}`)
      .set('Accept', 'application/json')
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

  }); // end of PUT /api/ingredients - edit route

  describe('DELETE /api/ingredients/:id', () => {

    it('should return a 204 response after deleting', function(done) {
      api
        .delete(`/api/ingredients/${ingredientId}`)
        .set('Accept', 'application/json')
        .expect(204, done);
    });

  }); // end of DELETE /api/ingredients/:id block

});
