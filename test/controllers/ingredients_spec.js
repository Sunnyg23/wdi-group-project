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

  }); // end of GET /api/ingredients/:id block

});
