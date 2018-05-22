import chai from 'chai';
import chaiHttp from 'chai-http';
import requestRoute from '../routes/requestRoute';

chai.should();
chai.use(chaiHttp);
const modifyRequest = () => {
  describe('/PUT Request', () => {
    it('It should modify a Request', (done) => {
      chai.request(requestRoute)
        .put('/users/requests/1')
        .send({
          title: 'Faulty AC',
          status: 'resolved',
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('It should not modify request if title is not alphanumeric except for space & hyphen', (done) => {
      chai.request(requestRoute)
        .put('/users/requests/1')
        .send({
          title: ' ......&***)(',
          description: 'The first WC in the rest room is not working',
          status: 'disapproved',
          date: '12-12-2018',
          image: ''
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Request title can only contain alphanumeric characters, space & hypen');
          done();
        });
    });
    it('It should not modify request if title is not alphanumeric without space', (done) => {
      chai.request(requestRoute)
        .put('/users/requests/1')
        .send({
          title: '@faulty',
          description: 'The first WC in the rest room is not working',
          status: 'disapproved',
          date: '12-12-2018',
          image: ''
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Request title can only contain alphanumeric characters, space & hypen');
          done();
        });
    });
    it('It should not modify request if description field is not string', (done) => {
      chai.request(requestRoute)
        .put('/users/requests/0')
        .send({
          title: 'Damaged door',
          description: 1,
          status: 'approved',
          date: '12-12-2018',
          image: ''
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid Format for description field');
          done();
        });
    });
    it('It should not modify request if status is invalid', (done) => {
      chai.request(requestRoute)
        .put('/users/requests/1')
        .send({
          description: 'The first WC in the rest room is not working',
          status: 'wvkd',
          date: '12-12-2018',
          image: ''
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Status not valid');
          done();
        });
    });
    it('It should NOT process an invalid request ID', (done) => {
      chai.request(requestRoute)
        .put('/users/requests/1tuuy')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid ID');
          done();
        });
    });
    it('It should NOT process a non-existing request ID', (done) => {
      chai.request(requestRoute)
        .put('/users/requests/9000000')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.be.eql('Invalid ID');
          done();
        });
    });
  });
};
export default modifyRequest;
