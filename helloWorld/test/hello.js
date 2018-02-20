//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
process.env.NODE_hello = 'mocha chai[http]';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let should = chai.should();

chai.use(chaiHttp);

describe('test routes', () => {
 /*
  * Test the /GET route
  */
  describe('/GET truefalse', () => {
      it('it should GET one true one false', (done) => {
        chai.request(server)
            .get('/test/truefalse')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.testTrue.should.to.be.true;
                res.body.testFalse.should.to.be.false;
              done();
            });
      });
  });

  describe('/GET default route', () => {
    it('it should GET a status code 200 here', (done) => {
      chai.request(server)
          .get('/')
          .end( (err,res) => {
              res.should.have.status(200);
            done();
          });
    });
  });
});