import chai from 'chai';
import chaiHttp from 'chai-http';
import getRequest from './getRequest.test';
import postRequest from './postRequest.test';
import updateRequest from './updateRequest.test';
import createUser from './createUser.test';
import loginUser from './loginUser.test';
import adminGetAll from './adminGetAll.test';
import adminApprove from './adminApprove.test';
import adminDisapprove from './adminDisapprove.test';
import adminResolve from './adminResolve.test';
import makeAdmin from './makeAdmin.test';
import deleteRequest from './deleteRequest.test';

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
  deleteRequest();
  createUser();
  makeAdmin();
  adminGetAll();
});
