import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);
const getRequest = () => {
  describe('/GET Request', () => {
    it('It should get all requests', (done) => {
      chai.request(app)
        .get('/api/v1/users/requests')
        .end((err, res) => {
          res.should.have.status(200);
          assert.isArray(res.body.data, 'The response is type Array');
          done();
        });
    });
    it('It should filter request by status approved', (done) => {
      chai.request(app)
        .get('/api/v1/users/requests?status= approved')
        .end((err, res) => {
          res.should.have.status(200);
          assert.isArray(res.body.data, 'The response is type Array');
          assert.equal(res.body.data[0].status, 'approved');
          assert.notEqual(res.body.data[1].status, 'disapproved');
          done();
        });
    });
    it('It should filter request by status disapproved', (done) => {
      chai.request(app)
        .get('/api/v1/users/requests?status=disapproved')
        .end((err, res) => {
          res.should.have.status(200);
          assert.isArray(res.body.data, 'The response is type Array');
          assert.equal(res.body.data[0].status, 'disapproved');
          assert.notEqual(res.body.data[1].status, 'approved');
          done();
        });
    });
    it('It should filter request by status resolved', (done) => {
      chai.request(app)
        .get('/api/v1/users/requests?status=resolved')
        .end((err, res) => {
          res.should.have.status(200);
          assert.isArray(res.body.data, 'The response is type Array');
          assert.equal(res.body.data[0].status, 'resolved');
          assert.notEqual(res.body.data[1].status, 'approved');
          done();
        });
    });
    it('It should filter request by category electrical', (done) => {
      chai.request(app)
        .get('/api/v1/users/requests?category=electrical')
        .end((err, res) => {
          res.should.have.status(200);
          assert.isArray(res.body.data, 'The response is type Array');
          assert.equal(res.body.data[0].category, 'electrical');
          assert.notEqual(res.body.data[1].category, 'mechanical');
          done();
        });
    });
    it('It should get a single Business', (done) => {
      chai.request(app)
        .get('/api/v1/users/requests/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.id.should.eql(1);
          assert.isObject(res.body.data, 'The response is object');
          done();
        });
    });
    it('It should return Not found for an invalid Id', (done) => {
      chai.request(app)
        .get('/api/v1/users/requests/900000')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.eql('Request not found');
          done();
        });
    });
    it('It should NOT process an invalid Request ID', (done) => {
      chai.request(app)
        .get('/api/v1/users/requests/tuuy')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid ID');
          done();
        });
    });
  });
};
export default getRequest;
