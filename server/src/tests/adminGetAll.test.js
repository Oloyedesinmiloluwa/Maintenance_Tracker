import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);
const adminGetAll = () => {
  describe('/GET Request', () => {
    it('It should sign in admin', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'sinmiloluwasunday@yahoo.com', password: 'test'
        })
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.message, 'Login successful');
          done();
        });
    });
    it('It should get all requests if admin', (done) => {
      chai.request(app)
        .get('/api/v1/requests')
        .end((err, res) => {
          res.should.have.status(200);
          assert.isArray(res.body.data, 'The response is type Array');
          done();
        });
    });
    it('It should sign in another user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'regular3@yahoo.com', password: 'test'
        })
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.message, 'Login successful');
          done();
        });
    });
    it('It should not return all requests if not admin', (done) => {
      chai.request(app)
        .get('/api/v1/requests')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.eql('You are not an admin');
          done();
        });
    });
  });
};
export default adminGetAll;
