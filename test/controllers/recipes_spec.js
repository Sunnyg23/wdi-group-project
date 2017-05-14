const {api, expect} = require('../spec_helper');
const Recipe = require('../../models/recipe');
const User = require('../../models/user');

describe('Recipes controllers tests', () => {
  let recipeId;
  let gUser;
  let myToken;

  beforeEach(done => {
    clearUsersAndRecipes(done);
  });
  afterEach(done => {
    clearUsersAndRecipes(done);
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

        return Recipe
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
          });
      })
      .then(recipe => {
        recipeId = recipe._id;

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

  describe('GET /api/recipes', () => {

    it('should return a 200 response', function(done) {
      this.skip();
      api.get('/api/recipes')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+myToken)
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
      .set('Authorization', 'Bearer '+myToken)
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
      .set('Authorization', 'Bearer '+myToken)
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.body).to.be.an('array');
        done();
      });
    });

  }); // end of GET /api/recipes

  describe('GET /api/recipes/:id', () => {

    it('should return a 200 response', function(done) {
      // this.skip();
      api.get(`/api/recipes/${recipeId}`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+myToken)
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.status).to.eq(200);
        done();
      });
    });

    it('should return a single object', function(done) {
      // this.skip();
      api.get(`/api/recipes/${recipeId}`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+myToken)
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.headers['content-type'])
        .to.be.eq('application/json; charset=utf-8');
        done();
      });
    });

    it('should return an object with required keys', function(done) {
      // this.skip();
      api.get(`/api/recipes/${recipeId}`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+myToken)
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
      // this.skip();
      api.get('/api/recipes/56cb91bdc3464f14678934ca')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+myToken)
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
      // this.skip();
      api.post('/api/recipes')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+myToken)
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
      // this.skip();
      api.post('/api/recipes')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+myToken)
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
      // this.skip();
      api.post('/api/recipes')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+myToken)
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
      // this.skip();
      api.post('/api/recipes')
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

  }); // end of POST /api/recipes - new route

  describe('PUT /api/recipes - edit route', () => {

    it('should return a 201 response', function(done) {
      // this.skip();
      api.put(`/api/recipes/${recipeId}`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+myToken)
      .send({
        name: 'name changed'
      })
      .expect(201, done);
    });

    it('should return the created json object', function(done) {
      // this.skip();
      api.put(`/api/recipes/${recipeId}`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+myToken)
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
      // this.skip();
      api.put(`/api/recipes/${recipeId}`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+myToken)
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

    it('should return a 404 response if the id is wrong', function(done) {
      // this.skip();
      api.put(`/api/recipes/56cb91bdc3464f14678934ca`)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+myToken)
      .send({
        name: 'name changed'
      })
      .expect(404, done);
    });

  }); // end of PUT /api/recipes - edit route

  describe('DELETE /api/recipes/:id', () => {

    it('should return a 204 response after deleting', function(done) {
      // this.skip();
      api
        .delete(`/api/recipes/${recipeId}`)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+myToken)
        .expect(204, done);
    });

  }); // end of DELETE /api/recipes/:id block

});

function clearUsersAndRecipes(done) {
  User
    .remove()
    .then(() => {
      Recipe
        .remove()
        .then(() => done())
        .catch(done);
    })
    .catch(done);
}
