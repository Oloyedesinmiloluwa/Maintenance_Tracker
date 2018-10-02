import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Signin from './Signin';



const AppRoute = (props) =>(
    <Router>
        <div>
            <Switch>
                {/* <Route path="/" component={Home} exact/> */}
                <Route path="/signin" component={Signin} />
            </Switch>
        </div>
    </Router>
    );
const mapStateToProps = (state) => ({
currentUser: state.currentUser
});

export default connect(mapStateToProps, null)(AppRoute);
