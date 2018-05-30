import chai from 'chai';
import chaiHttp from 'chai-http';
import getRequest from './getRequest';
import postRequest from './postRequest';
import updateRequest from './updateRequest';
import createUser from './createUser';
import loginUser from './loginUser';
import adminGetAll from './adminGetAll';
import adminApprove from './adminApprove';
import adminDisapprove from './adminDisapprove';
import adminResolve from './adminResolve';
import makeAdmin from './makeAdmin';

chai.should();
chai.use(chaiHttp);
describe('Test for Request API endpoints', () => {
  loginUser();
  getRequest();
  postRequest();
  updateRequest();
  adminApprove();
  adminDisapprove();
  adminResolve();
  createUser();
  makeAdmin();
  adminGetAll();
});
