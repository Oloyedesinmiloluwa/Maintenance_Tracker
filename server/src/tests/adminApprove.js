import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import adminRoute from '../routes/adminRoute';

chai.should();
chai.use(chaiHttp);
const adminApprove = () => {
  describe('/PUT', () => {
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
  });
};
export default adminApprove;
