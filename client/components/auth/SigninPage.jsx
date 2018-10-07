
import React from 'react';
import { connect } from 'react-redux';
import UserLogin from '../../actions/loginAction'
import helper from '../../helpers';
import Nav from '../common/Navigation';
import SigninForm from './SigninForm';
import ForgotPasswordModal from './ForgotPasswordModal';
import emailAction from '../../actions/emailAction';

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
      const { showModal, modalState, email, password, error } = this.state;
      return (
        <div>
          <Nav Tab1={helper('home')} Tab2={helper('')} Tab3={helper('signup')} />
          <h1 className="text-center" id="logo">M-Tracker</h1>
          <p className="text-center" id="welcome-text">We handle repair or maintenance request the finest and fastest way</p>
          <SigninForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            email={email}
            password={password}
            error={error}
            showModal={this.showModal}
          />
          {showModal && <ForgotPasswordModal hideModal={this.hideModal} sendEmail={this.sendEmail} handleChange={this.handleChange} {...modalState} />}
          <p className="text-center">All rights reserved. M-tracker &copy;2018</p>
        </div>
    )
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.currentUser
  });
export default connect(mapStateToProps, { UserLogin, emailAction })(UserSignin);
