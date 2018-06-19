import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);
const deleteRequest = () => {
  describe('/DELETE Request', () => {
    it('It should delete a Request', (done) => {
      chai.request(app)
        .delete('/api/v1/users/requests/7')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.be.eql('Request successfully deleted');
          done();
        });
    });
    it('It should NOT process an invalid Request ID', (done) => {
      chai.request(app)
        .delete('/api/v1/users/requests/tuuy')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid ID');
          done();
        });
    });
    it('It should NOT process a non-existing Request ID', (done) => {
      chai.request(app)
        .delete('/api/v1/users/requests/9000000')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.be.eql('Request does not exist');
          done();
        });
    });
  });
};
export default deleteRequest;
