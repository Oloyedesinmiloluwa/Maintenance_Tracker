import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './components/AppRouter';
import '../vanilla/assets/css/main';
import '../vanilla/assets/css/normalize';
import configureStore from './store/configureStore';
const store = configureStore();
const App = () => {
    return (
        <Provider store={store}>
           <AppRouter />
        </Provider>
    )
}
render(<App />, document.getElementById('app'));
