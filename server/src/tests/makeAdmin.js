import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import adminRoute from '../routes/adminRoute';
import userRoute from '../routes/userRoute';

chai.should();
chai.use(chaiHttp);
const makeAdmin = () => {
  describe('/PUT ADMIN', () => {
    it('It should sign in admin', (done) => {
      chai.request(userRoute)
        .post('/auth/login')
        .send({
          email: 'sinmiloluwasunday@yahoo.com', password: 'test'
        })
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(res.body.message, 'Login successful');
          done();
        });
    });    
    it('It should approve a user as admin', (done) => {
      chai.request(adminRoute)
        .put('/admin/2/approve')
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.message, 'User role set to admin');
          done();
        });
    });
    it('It should not approve an unexisting user', (done) => {
      chai.request(adminRoute)
        .put('/admin/2000/approve')
        .end((err, res) => {
          res.should.have.status(404);
          assert.equal(res.body.message, 'User not found');
          done();
        });
    });
  });
};
export default makeAdmin;
