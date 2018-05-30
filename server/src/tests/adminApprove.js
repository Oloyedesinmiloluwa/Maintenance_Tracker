import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);
const adminApprove = () => {
  describe('/PUT ADMIN', () => {
    it('It should approve a pending request', (done) => {
      chai.request(app)
        .put('/api/v1/requests/7/approve')
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.message, 'Request approved');
          done();
        });
    });
    it('It should not approve a request that is not pending', (done) => {
      chai.request(app)
        .put('/api/v1/requests/1/approve')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.eql('Request has been acted upon');
          done();
        });
    });
    it('It should not approve an unexisting request', (done) => {
      chai.request(app)
        .put('/api/v1/requests/6000/approve')
        .end((err, res) => {
          res.should.have.status(404);
          assert.equal(res.body.message, 'Request not found');
          done();
        });
    });
    it('It should not process an invalid request id', (done) => {
      chai.request(app)
        .put('/api/v1/requests/6uiui/approve')
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(res.body.message, 'Invalid ID');
          done();
        });
    });
  });
};
export default adminApprove;
