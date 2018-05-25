import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import adminRoute from '../routes/adminRoute';

chai.should();
chai.use(chaiHttp);
const adminApprove = () => {
  describe('/PUT ADMIN', () => {
    it('It should approve a pending request', (done) => {
      chai.request(adminRoute)
        .put('/requests/7/approve')
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.message, 'Request approved');
          done();
        });
    });
    it('It should not approve a request that is not pending', (done) => {
      chai.request(adminRoute)
        .put('/requests/1/approve')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.eql('Request has been acted upon');
          done();
        });
    });
    it('It should not approve an unexisting request', (done) => {
      chai.request(adminRoute)
        .put('/requests/6000/approve')
        .end((err, res) => {
          res.should.have.status(404);
          assert.equal(res.body.message, 'Request not found');
          done();
        });
    });
  });
};
export default adminApprove;
