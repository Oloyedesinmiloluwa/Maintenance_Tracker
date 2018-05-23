import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import requestRoute from '../routes/requestRoute';

dotenv.config();
chai.should();
chai.use(chaiHttp);
const postRequest = () => {
  describe('/POST Request', () => {
    it('It should create a Request', (done) => {
      chai.request(requestRoute)
        .post('/users/requests')
        .send({
          title: 'Broken wall',
          description: 'every wall in the room is broken',
          category: 'electrical',
        })
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(res.body.message, 'Request Added Successfully');
          done();
        });
    });
    it('It should not create Request if missing title', (done) => {
      chai.request(requestRoute)
        .post('/users/requests')
        .send({
          title: '',
          description: 'every wall in the room is broken',
          category: 'electrical',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Request title required');
          done();
        });
    });
    it('It should not create Request if missing description', (done) => {
      chai.request(requestRoute)
        .post('/users/requests')
        .send({
          title: 'Broken fence',
          description: '',
          category: 'electrical'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Request description required');
          done();
        });
    });
    it('It should not create Request if title field is not a string', (done) => {
      chai.request(requestRoute)
        .post('/users/requests')
        .send({
          title: 1,
          description: 'we have a fault',
          category: 'electrical'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid Format for title field');
          done();
        });
    });
    it('It should not create Request if description field is not a string', (done) => {
      chai.request(requestRoute)
        .post('/users/requests')
        .send({
          title: 'fault',
          description: true,
          category: 'electrical'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid Format for description field');
          done();
        });
    });
    it('It should not create Request if category field is not a string', (done) => {
      chai.request(requestRoute)
        .post('/users/requests')
        .send({
          title: 'fault',
          description: 'there is fault',
          category: true
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid Format for category field');
          done();
        });
    });
    it('It should not create Request if image field is not a string', (done) => {
      chai.request(requestRoute)
        .post('/users/requests')
        .send({
          title: 'fault',
          description: 'there is fault',
          category: 'electrical',
          image: 1
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid Format for image field');
          done();
        });
    });
  });
};
export default postRequest;
