const {api, expect} = require('../spec_helper');
const Cuisine = require('../../models/cuisine');

describe('Cuisines controllers tests', () => {

  describe('GET /api/cuisines', () => {

    it('should return a 200 response', function(done) {
      api.get('/api/cuisines')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.status).to.eq(200);
        done();
      });
    });

  }); // end of GET /api/cuisines

});
