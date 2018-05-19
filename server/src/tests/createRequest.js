import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import requestRoute from '../routes/requestRoute';

chai.should();
chai.use(chaiHttp);
const createRequest = () => {
  describe('/POST Request', () => {
    it('It should create request', (done) => {
      chai.request(requestRoute)
        .post('/users/requests')
        .send({
          title: 'Faulty WC',
          description: 'The first WC in the rest room is not working',
          category: 'Electrical',
          date: '12-12-2018',
          image: ''
        })
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.id, 6);
          done();
        });
    });
    it('It should create request if title contains hyphen and space', (done) => {
      chai.request(requestRoute)
        .post('/users/requests')
        .send({
          title: 'Damaged CD-ROM',
          description: 'The first WC in the rest room is not working',
          date: '12-12-2018',
          image: ''
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.id.should.be.eql(7);
          done();
        });
    });
    it('It should not create request if title is missing', (done) => {
      chai.request(requestRoute)
        .post('/users/requests')
        .send({
          title: '',
          description: 'The first WC in the rest room is not working',
          category: 'mechanical',
          date: '12-12-2018',
          image: ''
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Request title required');
          done();
        });
    });
    it('It should not create request if description is missing', (done) => {
      chai.request(requestRoute)
        .post('/users/requests')
        .send({
          title: 'Damaged door',
          description: '',
          category: 'electrical',
          date: '12-12-2018',
          image: ''
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Request description required');
          done();
        });
    });
    it('It should not create request if title field is not string', (done) => {
      chai.request(requestRoute)
        .post('/users/requests')
        .send({
          title: true,
          description: 'There is no fault just testing if it works',
          category: 'physical',
          date: '12-12-2018',
          image: ''
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid Format for title field');
          done();
        });
    });
    it('It should not create request if description field is not string', (done) => {
      chai.request(requestRoute)
        .post('/users/requests')
        .send({
          title: 'Damaged door',
          description: 1,
          category: 'mechanical',
          date: '12-12-2018',
          image: ''
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid Format for description field');
          done();
        });
    });
    it('It should not create request if title is not alphanumeric ', (done) => {
      chai.request(requestRoute)
        .post('/users/requests')
        .send({
          title: '......&***)(',
          description: 'The first WC in the rest room is not working',
          date: '12-12-2018',
          image: ''
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Request title can only contain alphanumeric characters, space & hypen');
          done();
        });
    });
    it('It should not create request if title is not alphanumeric with space', (done) => {
      chai.request(requestRoute)
        .post('/users/requests')
        .send({
          title: ' ......&***)(',
          description: 'The first WC in the rest room is not working',
          date: '12-12-2018',
          image: ''
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Request title can only contain alphanumeric characters, space & hypen');
          done();
        });
    });
  });
};
export default createRequest;
