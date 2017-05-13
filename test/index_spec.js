const {api, expect} = require('./spec_helper');

describe('testing index.html', () => {

  describe('GET /', () => {

    it('should respond with 200', function(done) {
      // this.skip();
      api.get('/')
      .set('Accept', 'application/html')
      .end((err, res) => {
        if(err) console.log(err);
        expect(res.status).to.eq(200);
        done();
      });
    });

  }); // end of GET /

});
