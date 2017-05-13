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

    it('should return a html doc', function(done) {
      // this.skip();
      api
        .get('/')
        .set('Accept', 'application/html')
        .end((err, res) => {
          if(err) console.log(err);
          expect(res.headers['content-type'])
          .to.eq('text/html; charset=UTF-8');
          done();
        });
    });

    it('should have a title of Vegan Chef', function(done) {
      // this.skip();
      api
        .get('/')
        .set('Accept', 'application/html')
        .end((err, res) => {
          if(err) console.log(err);
          expect(res.text)
            .to.contain('<title>Vegan Chef</title>');
          done();
        });
    });

  }); // end of GET /

});
