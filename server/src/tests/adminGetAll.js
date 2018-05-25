import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import adminRoute from '../routes/adminRoute';
import userRoute from '../routes/userRoute';

chai.should();
chai.use(chaiHttp);
const adminGetAll = () => {
  describe('/GET Request', () => {
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
    it('It should get all requests if admin', (done) => {
      chai.request(adminRoute)
        .get('/requests')
        .end((err, res) => {
          res.should.have.status(200);
          assert.isArray(res.body, 'The response is type Array');
          done();
        });
    });
    it('It should sign in another user', (done) => {
      chai.request(userRoute)
        .post('/auth/login')
        .send({
          email: 'regular3@yahoo.com', password: 'test'
        })
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(res.body.message, 'Login successful');
          done();
        });
    });
    it('It should not return all requests if not admin', (done) => {
      chai.request(adminRoute)
        .get('/requests')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.eql('You are not an admin');
          done();
        });
    });
  });
};
export default adminGetAll;
