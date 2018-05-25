import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import adminRoute from '../routes/adminRoute';

chai.should();
chai.use(chaiHttp);
const adminDisapprove = () => {
  describe('/PUT', () => {
    it('It should disapprove a pending request', (done) => {
      chai.request(adminRoute)
        .put('/requests/7/disapprove')
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.message, 'Request disapproved');
          done();
        });
    });
  });
};
export default adminDisapprove;
