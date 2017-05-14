const {api, expect} = require('../spec_helper');
const Cuisine = require('../../models/cuisine');

describe('Cuisines controllers tests', () => {
  let cuisineId;

  beforeEach(done => {
    Cuisine
      .remove()
      .then(() => done())
      .catch(done);
  });
  afterEach(done => {
    Cuisine
      .remove()
      .then(() => done())
      .catch(done);
  });

  beforeEach(done => {
    Cuisine
      .create({
        name: 'Indian',
        // recipies: [{type: mongoose.Schema.ObjectId, ref: 'Recipe'}],
        images: {
          small: '',
          large: '',
          others: ['']
        }
      })
      .then(cuisine => {
        cuisineId = cuisine._id;
        done();
      })
      .catch(done);
  });

  describe('GET /api/cuisines', () => {

    it('should return a 200 response', function(done) {
      // this.skip();
      api.get('/api/cuisines')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.status).to.eq(200);
        done();
      });
    });

    it('should return an JSON object', function(done) {
      // this.skip();
      api.get('/api/cuisines')
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
      api.get('/api/cuisines')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.body).to.be.an('array');
        done();
      });
    });

  }); // end of GET /api/cuisines

  describe('GET /api/cuisines/:id', () => {

    it('should return a 200 response', function(done) {
      api.get(`/api/cuisines/${cuisineId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.status).to.eq(200);
        done();
      });
    });

    it('should return a single object', function(done) {
      // this.skip();
      api.get(`/api/cuisines/${cuisineId}`)
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
      api.get(`/api/cuisines/${cuisineId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.body)
        .to.have.all.keys([
          'name',
          'recipes',
          'images',
          '_id',
          '__v'
        ]);
        done();
      });
    });

    it('should not return an object if the id is wrong', function(done) {
      // this.skip();
      api.get('/api/cuisines/56cb91bdc3464f14678934ca')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.status).to.eq(404);
        done();
      });
    });

  }); // end of GET /api/cuisines/:id block

  describe('POST /api/cuisines - new route', () => {

    it('should return a 201 response', function(done) {
      api.post('/api/cuisines')
      .set('Accept', 'application/json')
      .send({
        name: 'Indian',
        // recipies: [{type: mongoose.Schema.ObjectId, ref: 'Recipe'}],
        images: {
          small: '',
          large: '',
          others: ['']
        }
      })
      .expect(201, done);
    });

    it('should return the created json object', function(done) {
      api.post('/api/cuisines')
      .set('Accept', 'application/json')
      .send({
        name: 'Indian',
        // recipies: [{type: mongoose.Schema.ObjectId, ref: 'Recipe'}],
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
          'recipes',
          'images',
          '_id',
          '__v'
        ]);
        done();
      });
    });

    it('should return created object with correct keys', function(done) {
      api.post('/api/cuisines')
      .set('Accept', 'application/json')
      .send({
        name: 'Indian',
        // recipies: [{type: mongoose.Schema.ObjectId, ref: 'Recipe'}],
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
      api.post('/api/cuisines')
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

  }); // end of POST /api/cuisines - new route

  describe('PUT /api/cuisines - edit route', () => {

    it('should return a 201 response', function(done) {
      api.put(`/api/cuisines/${cuisineId}`)
      .set('Accept', 'application/json')
      .send({
        name: 'name changed'
      })
      .expect(201, done);
    });

    it('should return the created json object', function(done) {
      api.put(`/api/cuisines/${cuisineId}`)
      .set('Accept', 'application/json')
      .send({
        name: 'name changed'
      })
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.body)
        .to.have.all.keys([
          'name',
          'recipes',
          'images',
          '_id',
          '__v'
        ]);
        done();
      });
    });

    it('should return created object with correct keys', function(done) {
      api.put(`/api/cuisines/${cuisineId}`)
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

  }); // end of PUT /api/cuisines - edit route

  describe('DELETE /api/cuisines/:id', () => {

    it('should return a 204 response after deleting', function(done) {
      api
        .delete(`/api/cuisines/${cuisineId}`)
        .set('Accept', 'application/json')
        .expect(204, done);
    });

  }); // end of DELETE /api/cuisines/:id block

});
