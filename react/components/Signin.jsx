
import React from 'react';
import PropTypes from 'prop-types';
import { Link , Redirect, history } from 'react-router-dom';
import { connect } from 'react-redux';
import UserLogin from '../actions/loginAction'
import helper from '../helpers';
import Nav from './Navigation';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import emailAction from '../actions/emailAction';

class UserSignin extends React.Component {
    state = {
        email: '',
        password: '',
        error: '',
        showModal: false,
        modalState: {
          emailInput: '',
          emailReport: { message: '', color: ''},
        }
    };
    handleSubmit = (event) => {
      const { email, password } = this.state;
        event.preventDefault();
        this.props.UserLogin({ email, password })
        .then((response) => {
          response.message !== 'Login successful' ? this.setState({error: response.message}):this.props.history.push('/');
          // if(response.message !== 'Login successful'){
          //   this.setState({error: response.message});
          // }else {
          // this.props.history.push('/');
          // }
        });
    };
    handleChange = (event) => {
      const { modalState } = this.state;
      if (event.target.id === 'modal-email') {
        this.setState({ modalState: { ...modalState, emailInput : event.target.value }})
        return;

    }
        this.setState({ [event.target.id]: event.target.value });
    }

    showModal = () => {
        this.setState({ showModal: true })
    }

    hideModal = (event) => {
      if (event.target.className === 'modal' || event.target.className === 'close') this.setState({ showModal: false });
    }

    sendEmail = () => {
      const { emailAction } = this.props;
      const { modalState } = this.state;
      this.setState({ modalState: { ...modalState, emailReport: { message: 'Processing...', color: 'lightblue'} } });
      emailAction(modalState.emailInput).then((response) => {
        if (response.message === 'Email sent successfully') {
          this.setState({ modalState: { ...modalState, emailReport: { message: response.message, color: 'green'} } });
        } else {
          this.setState({ modalState: { ...modalState, emailReport: { message: response.message, color: 'tomato'} } });
        }
      })
    }

    render() {
      const { showModal, modalState } = this.state;
      return (
        <div>
        <Nav Tab1={helper('home')} Tab2= {helper('')} Tab3={helper('signup')} />
          {/* <Redirect to="/signup" /> */}
    <h1 className="text-center" id= "logo">M-Tracker</h1>
    <p className="text-center" id="welcome-text">We handle repair or maintenance request the finest and fastest way</p>
    <div className="form-container">
    <h3 className="text-center" id ="login-text">Provide your login details</h3>
<div className="container">
    <form onSubmit={this.handleSubmit}>
      <ul className="flex-outer">
          <p id = "messageText" >{this.state.error}</p>
        <li>
          <label htmlFor="email">Email<span className="red-text">*</span></label>
          <input type="email" id="email" required autoComplete="username" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
        </li>
        <li>
          <label htmlFor="password">Password<span className="red-text">*</span></label>
          <input type="password" required autoComplete="password" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
        </li>
        <li>
          <Link to="#" onClick={this.showModal} id="forgot-pswd"> Forgot your password ?</Link>
        </li>
        <li>
          <button id="signin-btn" type="submit">Sign in</button>
        </li>
      </ul>
    </form>
  </div>
    </div>
    { showModal && <ForgotPasswordModal hideModal = {this.hideModal} sendEmail= {this.sendEmail} handleChange = {this.handleChange} {...modalState} />}
    <p className="text-center">All rights reserved. M-tracker &copy;2018</p>
  </div>
    )
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.currentUser
  });
export default connect(mapStateToProps, { UserLogin, emailAction })(UserSignin);
