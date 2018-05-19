import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import requestRoute from '../routes/requestRoute';

chai.should();
chai.use(chaiHttp);
const getRequest = () => {
  describe('/GET Request', () => {
    it('It should get all requests', (done) => {
      chai.request(requestRoute)
        .get('/users/requests')
        .end((err, res) => {
          res.should.have.status(200);
          assert.isArray(res.body, 'The response is type Array');
          done();
        });
    });
    it('It should filter request by status approved', (done) => {
      chai.request(requestRoute)
        .get('/users/requests?status=approved')
        .end((err, res) => {
          res.should.have.status(200);
          assert.isArray(res.body, 'The response is type Array');
          assert.equal(res.body[0].status, 'approved');
          assert.notEqual(res.body[1].status, 'disapproved');
          done();
        });
    });
    it('It should filter request by status disapproved', (done) => {
      chai.request(requestRoute)
        .get('/users/requests?status=disapproved')
        .end((err, res) => {
          res.should.have.status(200);
          assert.isArray(res.body, 'The response is type Array');
          assert.equal(res.body[0].status, 'disapproved');
          assert.notEqual(res.body[1].status, 'approved');
          done();
        });
    });
    it('It should filter request by status resolved', (done) => {
      chai.request(requestRoute)
        .get('/users/requests?status=resolved')
        .end((err, res) => {
          res.should.have.status(200);
          assert.isArray(res.body, 'The response is type Array');
          assert.equal(res.body[0].status, 'resolved');
          assert.notEqual(res.body[1].status, 'approved');
          done();
        });
    });
    it('It should get a single request', (done) => {
      chai.request(requestRoute)
        .get('/users/requests/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.id.should.eql(1);
          assert.isObject(res.body, 'The response is object');
          done();
        });
    });
    it('It should return Not found for an invalid Id', (done) => {
      chai.request(requestRoute)
        .get('/users/requests/900000')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
};
export default getRequest;
