const {api, expect} = require('../spec_helper');
const Cuisine = require('../../models/cuisine');

describe('Cuisines controllers tests', () => {

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



});
