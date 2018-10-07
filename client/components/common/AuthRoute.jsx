import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component, isLoggedIn, ...restProps }) => (
<Route {...restProps} render = {props => (isLoggedIn ? <Component {...props} /> : <Redirect to = {{ pathname: '/signin', state: { from: props.location } }} />)} />
);
export default AuthRoute;
