import React from 'react';
import PropTypes from 'prop-types';

const SignupForm = ({
  handleChange, handleSubmit, firstName, lastName, email, password, error
}) => (
    <div className="container">
    <form id="signup-form">
      <ul className="flex-outer">
          <p id = "messageText" >{ error }</p>
        <li>
          <label htmlFor="first-name">First Name<span className="red-text">*</span></label>
          <input type="text"
          id="firstName"
          value={firstName}
          onChange={handleChange}
          placeholder="First name"
          required
          />
        </li>
        <li>
          <label htmlFor="last-name">Last Name<span className="red-text">*</span></label>
          <input type="text"
          id="lastName"
          value={lastName}
          onChange={handleChange}
          placeholder="Last name"
          required
          />
        </li>
        <li>
          <label htmlFor="email">Email<span className="red-text">*</span></label>
          <input type="email"
          id="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          required
          />
        </li>
        <li>
          <label htmlFor="password">Password<span className="red-text">*</span></label>
          <input type="password"
          id="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          required
          />
        </li>
        <li>
          <button id="submitButton" type="submit" onClick={handleSubmit} >Sign up</button>
        </li>
      </ul>
    </form>
  </div>
);
SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
};
export default SignupForm;
