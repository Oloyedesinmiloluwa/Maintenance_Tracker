import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import adminRoute from '../routes/adminRoute';

chai.should();
chai.use(chaiHttp);
const adminDisapprove = () => {
  describe('/PUT ADMIN', () => {
    it('It should disapprove a request', (done) => {
      chai.request(adminRoute)
        .put('/requests/7/disapprove')
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.message, 'Request disapproved');
          done();
        });
    });
    it('It should not disapprove an unexisting request', (done) => {
      chai.request(adminRoute)
        .put('/requests/6000/resolve')
        .end((err, res) => {
          res.should.have.status(404);
          assert.equal(res.body.message, 'Request not found');
          done();
        });
    });
  });
};
export default adminDisapprove;
