import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Signin from './Signin';
import Signup from './SignupPage';
import Home from './Home';
import ManageDetailPage from './ManageDetailPage';
import RequestPage from './RequestPage';
import AuthRoute from './AuthRoute';
import NewRequestPage from './NewRequestPage';

const AppRoute = props => (
    <Router>
        <div>
            <Switch>
                <Route path="/" component={Home} exact/>
                <Route path="/signin" component={Signin} />
                <Route path="/signup" component={Signup} />
                <AuthRoute path="/requests/:requestId/edit" isLoggedIn = {props.currentUser.isAuthenticated} component = {NewRequestPage} {...props}/>
                <AuthRoute path="/requests/:requestId" exact isLoggedIn = {props.currentUser.isAuthenticated} component = {ManageDetailPage} {...props}/>
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
