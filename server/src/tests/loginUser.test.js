import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);
const loginUser = () => {
  describe('/POST User', () => {
    it('It should sign in user', (done) => {
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
    it('It should not sign in user with an unexisting username ', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: '111@yahoo.com', password: 'test'
        })
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal(res.body.message, 'No account with this email address');
          done();
        });
    });
    it('It should not sign in user with a wrong password ', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'sinmiloluwasunday@yahoo.com', password: 'testko'
        })
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal(res.body.message, 'Invalid Password');
          done();
        });
    });
    it('It should not sign in user if missing email field', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: '', password: 'test'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Email is required');
          done();
        });
    });
    it('It should not sign in user if missing password field', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'sinmi@yahoo.com', password: ''
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Password is required');
          done();
        });
    });
    it('It should not sign in user if email field is not a string', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          firstName: 'joe', lastName: 'Love', email: 5, password: 'test'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid Format for email field');
          done();
        });
    });
    it('It should not sign in user if password field is not a string', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          firstName: 'hello', lastName: 'Love', email: 'sinmi@yahoo.com', password: false
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid Format for password field');
          done();
        });
    });
  });
};
export default loginUser;
