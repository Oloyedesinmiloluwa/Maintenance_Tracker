import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);
const updateRequest = () => {
  describe('/PUT Request', () => {
    it('It should modify a Request', (done) => {
      chai.request(app)
        .put('/api/v1/users/requests/3')
        .send({
          title: 'Faulty Fan',
          description: 'We have two faulty fans now'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.be.eql('Request Updated Successfully');
          done();
        });
    });
    it('It should NOT process an invalid Request ID', (done) => {
      chai.request(app)
        .put('/api/v1/users/requests/tuuy')
        .send({
          title: 'Faulty fan',
          description: 'we have faults',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid ID');
          done();
        });
    });
    it('It should NOT process a non-existing Request ID', (done) => {
      chai.request(app)
        .put('/api/v1/users/requests/9000000')
        .send({
          title: 'Bad fault',
          description: 'we have no fault actually just testing',
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.be.eql('Request not found');
          done();
        });
    });
    it('It should NOT update if status is approved', (done) => {
      chai.request(app)
        .put('/api/v1/users/requests/1')
        .send({
          title: 'faulty request',
          description: 'we have a fault we have a fault we have a fault',
        })
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.be.eql('Request is already approved');
          done();
        });
    });
  });
};
export default updateRequest;
