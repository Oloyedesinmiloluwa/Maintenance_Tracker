import React from 'react';
import { Link } from 'react-router-dom';

export default ({ handleChange, handleSubmit, showModal, email, password, error }) => (
  <div className="form-container">
    <h3 className="text-center" id ="login-text">Provide your login details</h3>
  <div className="container">
    <form onSubmit={handleSubmit}>
      <ul className="flex-outer">
        <p id="messageText" >{error}</p>
        <li>
          <label htmlFor="email">Email<span className="red-text">*</span></label>
          <input type="email"
            id="email"
            required
            autoComplete="username"
            placeholder="Email"
            value={email}
            onChange={handleChange} />
        </li>
        <li>
          <label htmlFor="password">Password<span className="red-text">*</span></label>
          <input type="password"
            required
            autoComplete="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handleChange} />
        </li>
        <li>
          <Link to="#" onClick={showModal} id="forgot-pswd"> Forgot your password ?</Link>
        </li>
        <li>
          <button id="signin-btn" type="submit">Sign in</button>
        </li>
      </ul>
    </form>
  </div>
  </div>
);
