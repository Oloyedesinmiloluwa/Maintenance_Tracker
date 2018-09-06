import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Signup from './SignupPage';
import Signin from './Signin';
import ListRequest from './RequestPage';
import AddRequest from './NewRequestPage';
import ManageDetailPage from './ManageDetailPage';
import Home from './Home';
import AuthRoute from './AuthRoute';

const AppRoute = (props) =>(
    <Router>
        <div>
            <Switch>
                <Route path="/" component={Home} exact/>
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Signin} />
                <AuthRoute path="/new-request" isLoggedIn = {props.currentUser.isAuthenticated} component = {AddRequest} {...props}/>
                <AuthRoute path="/requests/:requestId/edit" isLoggedIn = {props.currentUser.isAuthenticated} component = {AddRequest} {...props}/>
                <AuthRoute path="/requests" exact isLoggedIn = {props.currentUser.isAuthenticated} component = {ListRequest} {...props}/>
                <AuthRoute path="/requests/:requestId" isLoggedIn = {props.currentUser.isAuthenticated} component = {ManageDetailPage} {...props}/>
            </Switch>
        </div>
    </Router>
    );
const mapStateToProps = (state) => ({
currentUser: state.currentUser
});

export default connect(mapStateToProps, null)(AppRoute);
