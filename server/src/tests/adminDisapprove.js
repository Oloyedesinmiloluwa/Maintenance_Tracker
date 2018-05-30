import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);
const adminDisapprove = () => {
  describe('/PUT ADMIN', () => {
    it('It should disapprove a request', (done) => {
      chai.request(app)
        .put('/api/v1/requests/7/disapprove')
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.message, 'Request disapproved');
          done();
        });
    });
    it('It should not disapprove an unexisting request', (done) => {
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
        .put('/api/v1/requests/6uiui/disapprove')
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(res.body.message, 'Invalid ID');
          done();
        });
    });
  });
};
export default adminDisapprove;
