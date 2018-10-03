import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Signin from './Signin';
import Signup from './SignupPage';
import Home from './Home';
import RequestPage from './RequestPage';
import AuthRoute from './AuthRoute';

const AppRoute = props => (
    <Router>
        <div>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/signin" component={Signin} />
                <Route path="/signup" component={Signup} />
                <AuthRoute path="/requests" exact isLoggedIn = {props.currentUser.isAuthenticated} component = {RequestPage} {...props}/>
            </Switch>
        </div>
    </Router>
);
const mapStateToProps = state => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps, null)(AppRoute);
