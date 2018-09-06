import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { loadRequests } from './actions/requestAction';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import App from './components/app';
import AppRouter from './components/AppRouter';
import '../client/assets/css/main';
import '../client/assets/css/normalize';
import configureStore from './store/configureStore';
// const store = createStore((state = {}) => state, applyMiddleware(thunk));
const store = configureStore();
// store.dispatch(loadRequests());
const App = () => {

    return (
        <Provider store={store}>
        <AppRouter />
        </Provider>
    )
}
render(<App />, document.getElementById('app'));
