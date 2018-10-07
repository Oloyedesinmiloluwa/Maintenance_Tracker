import React from 'react';
import PropTypes from 'prop-types';

const ForgotPasswordModal = ({
  hideModal, sendEmail, emailInput, emailReport, handleChange
}) => (
    <div onClick={hideModal} className="modal">
      <div className="modal-content clearfix">
        <div onClick={hideModal} className="close">&times;</div>
        <h4>Password Recovery</h4>
        <p>Provide the email address you registered with</p>
        <div className="email-container">
          &nbsp;<i className="fa fa-user"></i>&nbsp; <input onChange={handleChange} value={emailInput} type="email" id="modal-email" placeholder="Email" autoFocus />
        </div>
        <p className="text-center"><small> We will send you a link to reset your password</small></p>
        {emailReport.message && <p id="modal-messageText" style={{ color: emailReport.color }} className="text-center" >{emailReport.message}</p>}
        <button id="modal-btn" onClick={sendEmail} type="submit">Submit</button>
      </div>
    </div>
);
ForgotPasswordModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired,
  emailInput: PropTypes.string.isRequired,
  emailReport: PropTypes.shape({
    color: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};
export default ForgotPasswordModal;
