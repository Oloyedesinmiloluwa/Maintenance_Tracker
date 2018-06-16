import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);
const adminResolve = () => {
  describe('/PUT ADMIN', () => {
    it('It should resolve request', (done) => {
      chai.request(app)
        .put('/api/v1/requests/7/resolve')
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.message, 'Request resolved');
          done();
        });
    });
    it('It should not resolve an unexisting request', (done) => {
      chai.request(app)
        .put('/api/v1/requests/6000/resolve')
        .end((err, res) => {
          res.should.have.status(404);
          assert.equal(res.body.message, 'Request not found');
          done();
        });
    });
    it('It should not process an invalid request id', (done) => {
      chai.request(app)
        .put('/api/v1/requests/6uiui/resolve')
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(res.body.message, 'Invalid ID');
          done();
        });
    });
  });
};
export default adminResolve;
