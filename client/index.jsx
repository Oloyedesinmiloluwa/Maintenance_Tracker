import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import AppRouter from './components/AppRouter';
import '../vanilla/assets/css/main';
import '../vanilla/assets/css/normalize';
import configureStore from './store/configureStore';
import { setCurrentUser } from './actions/loginAction';
import initialState from './store/initialState';

const store = configureStore(initialState);
if (localStorage.getItem('token')) {
  const { iat, exp, ...userData} = jwtDecode(localStorage.getItem('token'));
  store.dispatch(setCurrentUser(userData));
}
const App = () => (
        <Provider store={store}>
           <AppRouter />
        </Provider>
);
render(<App />, document.getElementById('app'));
