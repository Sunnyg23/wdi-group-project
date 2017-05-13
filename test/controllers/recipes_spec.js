const {api, expect} = require('../spec_helper');
const Recipe = require('../../models/recipe');

describe('Recipes controllers tests', () => {
  let recipeId;

  beforeEach(done => {
    Recipe
    .remove()
    .then(() => done())
    .catch(done);
  });
  afterEach(done => {
    Recipe
    .remove()
    .then(() => done())
    .catch(done);
  });

  beforeEach(done => {
    Recipe
    .create({
      name: 'Gefilte Fish',
      // chef: {type: mongoose.Schema.ObjectId, ref: 'User'},
      instructions: [{
        index: 1,
        content: 'Some instructions'
      }],
      ingredients: [{
        measurement: 'one fish'
        // ingredient: {type: mongoose.Schema.ObjectId, ref: 'Ingredient'}
      }],
      images: {
        small: '',
        large: '',
        others: ['']
      }
    })
    .then(recipe => {
      recipeId = recipe._id;
      done();
    })
    .catch(done);
  });

  describe('GET /api/recipes', () => {

    it('should return a 200 response', function(done) {
      // this.skip();
      api.get('/api/recipes')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.status).to.eq(200);
        done();
      });
    });

    it('should return an JSON object', function(done) {
      // this.skip();
      api.get('/api/recipes')
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
      api.get('/api/recipes')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.body).to.be.an('array');
        done();
      });
    });

  }); // end of GET /api/recipes

  describe('GET /api/recipes/:id', () => {

    it('should return a 200 response', function(done) {
      api.get(`/api/recipes/${recipeId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.status).to.eq(200);
        done();
      });
    });
    
  });

});
