import React from 'react';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import UserSignup from '../../actions/signupAction';
import Nav from '../common/Navigation';
import helper from '../../helpers';
class UserSignupPage extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        error: ''
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.UserSignup(this.state).then((response) => {
          response.message !== 'Successfully created an account' ? this.setState({error: response.message}):this.props.history.push('/');
        });
    };
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }
    render() {
        return (
            <div>
                <Nav Tab1={helper('home')} Tab2= {helper('')} Tab3={helper('signin')} />
                <h1 className="text-center" id= "logo">M-Tracker</h1>
                <p className="text-center" id="welcome-text">We handle repair or maintenance request the finest and fastest way</p>
                <div className="form-container">
                <h3 className="text-center" id ="login-text">Create an account with us</h3>
                    <SignupForm
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        email={this.state.email}
                        password={this.state.password}
                        error={this.state.error}
                    />
                </div>
                <p className="text-center">All rights reserved. M-tracker &copy;2018</p>
            </div>
        )
    }
}
UserSignupPage.propTypes = {
  UserSignup: PropTypes.func.isRequired
}
export default connect(null, { UserSignup })(UserSignupPage);
