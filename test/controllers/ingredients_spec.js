const {api, expect} = require('../spec_helper');
const Ingredient = require('../../models/ingredient');

describe('Ingredients controllers tests', () => {

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



});
