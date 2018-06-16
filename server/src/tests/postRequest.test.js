import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);
const postRequest = () => {
  describe('/POST Request', () => {
    it('It should create a Request', (done) => {
      chai.request(app)
        .post('/api/v1/users/requests')
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
      chai.request(app)
        .post('/api/v1/users/requests')
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
      chai.request(app)
        .post('/api/v1/users/requests')
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
      chai.request(app)
        .post('/api/v1/users/requests')
        .send({
          title: 1,
          description: 'every wall in the room is broken',
          category: 'electrical'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid Format for title field');
          done();
        });
    });
    it('It should not create Request if description field is not a string', (done) => {
      chai.request(app)
        .post('/api/v1/users/requests')
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
      chai.request(app)
        .post('/api/v1/users/requests')
        .send({
          title: 'fault',
          description: 'every wall in the room is broken',
          category: true
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid Format for category field');
          done();
        });
    });
    it('It should not create Request if image field is not a string', (done) => {
      chai.request(app)
        .post('/api/v1/users/requests')
        .send({
          title: 'fault',
          description: 'every wall in the room is broken there is fault',
          category: 'electrical',
          image: 1
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid Format for image field');
          done();
        });
    });
    it('It should not create Request if title is more than 20 characters', (done) => {
      chai.request(app)
        .post('/api/v1/users/requests')
        .send({
          title: 'faultfaultfaultfault1',
          description: 'every wall in the room is broken there is fault',
          category: 'electrical',
          image: 1
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Title cannot be more than 20 characters');
          done();
        });
    });
    it('It should not create Request if description is more than 250 characters', (done) => {
      chai.request(app)
        .post('/api/v1/users/requests')
        .send({
          title: 'fault',
          description: 'there is faultthere is faultthere is faultthere is faultthere is faultthere is faultthere is faultthere is faultthere is faultthere is faultthere is faultthere is faultthere is faultthere is faultthere is faultthere is faultthere is faultthere is fault123',
          category: 'electrical',
          image: 1
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Description length cannot be more than 250 characters');
          done();
        });
    });
    it('It should not create Request if category length is more than 20 characters', (done) => {
      chai.request(app)
        .post('/api/v1/users/requests')
        .send({
          title: 'fault',
          description: 'every wall in the room is broken there is fault',
          category: 'electricalelectrical1',
          image: 1
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Category length cannot be more than 20 characters');
          done();
        });
    });
    it('It should not create Request if image length is more than 20 characters', (done) => {
      chai.request(app)
        .post('/api/v1/users/requests')
        .send({
          title: 'fault',
          description: 'every wall in the room is broken there is fault',
          category: 'electrical',
          image: 'theimage is where youcannot think of because this is just a test this is just a test theimage is where youcannot think of because this is just a test theimage is where youcannot think of because this is just a test'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Image length cannot be more than 200 characters');
          done();
        });
    });
  });
};
export default postRequest;
