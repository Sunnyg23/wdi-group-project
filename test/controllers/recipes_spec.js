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
      //this.skip();
      api.get(`/api/recipes/${recipeId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.status).to.eq(200);
        done();
      });
    });

    it('should return a single object', function(done) {
      //this.skip();
      api.get(`/api/recipes/${recipeId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.headers['content-type'])
        .to.be.eq('application/json; charset=utf-8');
        done();
      });
    });

    it('should return an object with required keys', function(done) {
      //this.skip();
      api.get(`/api/recipes/${recipeId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.body)
        .to.have.all.keys([
          'name',
          // 'chef',
          'instructions',
          'ingredients',
          'images',
          '_id',
          '__v'
        ]);
        done();
      });
    });

    it('should not return an object if the id is wrong', function(done) {
      //this.skip();
      api.get('/api/recipes/56cb91bdc3464f14678934ca')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.status)
        .to.eq(404);
        done();
      });
    });



  }); // end of -  describe('GET /api/recipes/:id')

  describe('POST /api/recipes - new route', () => {

    it('should return a 201 response', function(done) {
      api.post('/api/recipes')
      .set('Accept', 'application/json')
      .send({
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
      .expect(201, done);
    });

    it('should return the created json object', function(done) {
      api.post('/api/recipes')
      .set('Accept', 'application/json')
      .send({
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
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.body)
        .to.have.all.keys([
          'name',
          // 'chef',
          'instructions',
          'ingredients',
          'images',
          '_id',
          '__v'
        ]);
        done();
      });
    });

    it('should return created object with correct keys', function(done) {
      api.post('/api/recipes')
      .set('Accept', 'application/json')
      .send({
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
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.headers['content-type'])
        .to.eq('application/json; charset=utf-8');
        done();
      });
    });

    it('should return 500 error if vaildation fails, empty object, name required', function(done) {
      api.post('/api/recipes')
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

  }); // end of POST /api/recipes - new route

  describe('PUT /api/recipes - edit route', () => {

    it('should return a 201 response', function(done) {
      api.put(`/api/recipes/${recipeId}`)
      .set('Accept', 'application/json')
      .send({
        name: 'name changed'
      })
      .expect(201, done);
    });

    it('should return the created json object', function(done) {
      api.put(`/api/recipes/${recipeId}`)
      .set('Accept', 'application/json')
      .send({
        name: 'name changed'
      })
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.body)
        .to.have.all.keys([
          'name',
          // 'chef',
          'instructions',
          'ingredients',
          'images',
          '_id',
          '__v'
        ]);
        done();
      });
    });

    it('should return created object with correct keys', function(done) {
      api.put(`/api/recipes/${recipeId}`)
      .set('Accept', 'application/json')
      .send({
        name: 'name changed'
      })
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.headers['content-type'])
        .to.eq('application/json; charset=utf-8');
        done();
      });
    });

  }); // end of PUT /api/recipes - edit route

  describe('DELETE /api/recipes/:id', () => {

    it('should return a 204 response after deleting', function(done) {
      api
        .delete(`/api/recipes/${recipeId}`)
        .set('Accept', 'application/json')
        .expect(204, done);
    });

  }); // end of DELETE /api/recipes/:id block

});
