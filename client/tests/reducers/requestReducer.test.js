import requestReducer, { currentRequestReducer } from '../../reducers/requestReducer';
import { setCurrentRequest, loadRequestSuccess, deleteRequestSuccess, createRequestSuccess } from '../../actions/requestAction';
import { requests } from '.././_mocks_/mockData';

describe('User Reducer Test', () => {
  it('should update current request state', (done) => {
    const initialState = {
      title: 'fault here and there',
      description: 'we have fault here and there'
    };
    const action = setCurrentRequest(requests[0]);

    // To cater for default value in switch case
    currentRequestReducer(initialState, {});
    expect(currentRequestReducer(initialState, action)).toEqual(requests[0]);
    done();
  });
  it('should update reqeusts state with a newly created request', (done) => {
    const action = createRequestSuccess(requests[0]);

    // To cater for default value in switch case
    requestReducer([], {});
    expect(requestReducer(requests, action)[2]).toEqual(requests[0]);
    done();
  });
  it('should update requests state with newly loaded requests', (done) => {
    const action = loadRequestSuccess(requests);
    expect(requestReducer(requests[0], action)).toEqual(requests);
    done();
  });
  it('should remove a deleted request from store', (done) => {
    const action = deleteRequestSuccess(requests[0].id);
    requests.splice(0, 1);
    expect(requestReducer(requests, action)).toEqual(requests);
    done();
  });
});
