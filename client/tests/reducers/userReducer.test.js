import userReducer from '../../reducers/userReducer';
import { setCurrentUser, signOutUser } from '../../actions/loginAction';
import { event } from '.././_mocks_/mockData';

describe('User Reducer Test', () => {
  it('should update current user state', (done) => {
    const initialState = {
      isAuthenticated: false,
      detail: {
        username: 'fdsflkdsjfldsf',
        email: 'olduser@yahoo.com',
      },
    };
    const newUser = {
      username: 'newperson',
      email: 'newuser@yahoo.com',
    };
    const action = setCurrentUser(newUser);

    // To cater for default value in switch case
    userReducer(initialState, {});
    expect(userReducer(initialState, action).detail).toEqual(newUser);
    done();
  });
  it('should clear current user state when unset action is called', (done) => {
    const initialState = {
      isAuthenticated: false,
      detail: {
        username: 'fdsflkdsjfldsf',
        email: 'olduser@yahoo.com',
      },
    };
    const expectedState = {
      isAuthenticated: false,
      detail: {}
    };
    event.target.textContent = 'Sign out';
    const action = signOutUser(event);

    // To cater for default value in switch case
    userReducer(initialState, {});
    expect(userReducer(initialState, action)).toEqual(expectedState);
    done();
  });
});
