import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Signin from './auth/SigninPage';
import Signup from './auth/SignupPage';
import Home from './home/Home';
import ManageDetailPage from './request/ManageDetailPage';
import RequestPage from './request/RequestPage';
import AuthRoute from './common/AuthRoute';
import NewRequestPage from './request/NewRequestPage';

const AppRoute = props => (
    <Router>
        <div>
            <Switch>
                <Route path="/" exact render={() => <Home userName={props.currentUser.detail.firstname} />} />
                <Route path="/signin" component={Signin} />
                <Route path="/signup" component={Signup} />
                <AuthRoute path="/requests/:requestId/edit" isLoggedIn = {props.currentUser.isAuthenticated} component = {NewRequestPage} {...props}/>
                <AuthRoute path="/requests" exact isLoggedIn = {props.currentUser.isAuthenticated} component = {RequestPage} {...props}/>
                <AuthRoute path="/requests/:requestId" exact isLoggedIn = {props.currentUser.isAuthenticated} component = {ManageDetailPage} {...props}/>
                <AuthRoute path="/new-request" isLoggedIn = {props.currentUser.isAuthenticated} component = {NewRequestPage} {...props}/>
            </Switch>
        </div>
    </Router>
);
const mapStateToProps = state => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps, null)(AppRoute);
