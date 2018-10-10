import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import loginAction from './../actions/loginAction';
import signupAction from './../actions/signupAction';
import { createRequest, getSingleRequest, loadRequests, actOnRequest, deleteRequest, editRequest, uploadImage } from './../actions/requestAction';
import actionTypes from './../actions/constants';
import { requests } from './_mocks_/mockData';

const mockStore = configureMockStore([thunk]);
describe('Testing API calls', () => {
  beforeEach(() => {

  });
  const expectedActions = [
    { type: actionTypes.SET_CURRENT_USER },
  ];
  const fetchResponse = {
    message: 'Successfully created an account',
    data: {
      username: 'JohnPaulr',
      email: 'John4@example.com',
      password: 'shit32132844',
    },
  };
  it('should dispatch SET_CURRENT_USER ACTION when signupAction is called', (done) => {
    fetch.once(JSON.stringify(fetchResponse));
    const store = mockStore({ currentUser: {} }, expectedActions, done);
    store.dispatch(signupAction(fetchResponse)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(actionTypes.SET_CURRENT_USER);
      done();
    });
  });
  it('should dispatch SET_CURRENT_USER ACTION when loginAction is called', (done) => {
    fetchResponse.message = 'Login successful';
    fetch.once(JSON.stringify(fetchResponse));
    const store = mockStore({ currentUser: {} }, expectedActions, done);
    store.dispatch(loginAction(fetchResponse)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(actionTypes.SET_CURRENT_USER);
      done();
    });
  });
  it('should dispatch CREATE_REQUEST ACTION when createRequest action is called', (done) => {
    fetchResponse.message = 'Request Added Successfully';
    fetch.once(JSON.stringify(fetchResponse));
    const store = mockStore({ currentUser: {} }, expectedActions, done);
    store.dispatch(createRequest(fetchResponse)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(actionTypes.CREATE_REQUEST);
      done();
    });
  });
  it('should dispatch CURRENT_REQUEST ACTION when getSingleRequest action is called', (done) => {
    // set fetchResponse.data to a mock value of request
    [fetchResponse.data] = requests;
    fetch.once(JSON.stringify(fetchResponse));
    const store = mockStore({ currentUser: {} }, expectedActions, done);
    store.dispatch(getSingleRequest(4)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(actionTypes.CURRENT_REQUEST);
      done();
    });
  });
  it('should dispatch LOAD_REQUEST ACTION when loadRequests action is called', (done) => {
    fetch.once(JSON.stringify(fetchResponse));
    const store = mockStore({ currentUser: {} }, expectedActions, done);
    store.dispatch(loadRequests(fetchResponse)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(actionTypes.LOAD_REQUESTS);
      done();
    });
  });
  it('should dispatch actOnRequest action when called', (done) => {
    fetch.once(JSON.stringify(fetchResponse));
    const store = mockStore({ currentUser: {} }, expectedActions, done);
    store.dispatch(actOnRequest(4, 'approve')).then((response) => {
      const actions = store.getActions();
      expect(actions).toEqual([]);
      expect(response.data).toEqual(requests[0]);
      done();
    });
  });
  it('should dispatch CURRENT_REQUEST action when editRequest action is called', (done) => {
    fetchResponse.message = 'Request Updated Successfully';
    fetch.once(JSON.stringify(fetchResponse));
    const store = mockStore({ currentUser: {} }, expectedActions, done);
    store.dispatch(editRequest(4, requests[0])).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(actionTypes.CURRENT_REQUEST);
      done();
    });
  });
  it('should dispatch DELETE_REQUEST action when deleteRequest action is called', (done) => {
    fetchResponse.status = 200;
    fetch.once(JSON.stringify(fetchResponse));
    const store = mockStore({ currentUser: {} }, expectedActions, done);
    store.dispatch(deleteRequest(4)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(actionTypes.DELETE_REQUEST);
      done();
    });
  });
  it('should dispatch uploadImage action when called', (done) => {
    fetch.once(JSON.stringify(fetchResponse));
    const store = mockStore({ currentUser: {} }, expectedActions, done);
    store.dispatch(uploadImage('I am a dummy file')).then((response) => {
      const actions = store.getActions();
      expect(actions).toEqual([]);
      expect(response.message).toBeTruthy();
      done();
    });
  });
});
