import chai from 'chai';
import chaiHttp from 'chai-http';
import modifyRequest from './modifyRequest';
import getRequest from './getRequest';
import createRequest from './createRequest';

chai.should();
chai.use(chaiHttp);
describe('Test for Request API endpoints', () => {
  createRequest();
  getRequest();
  modifyRequest();
});
