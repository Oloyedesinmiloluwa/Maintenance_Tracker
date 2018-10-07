import React from 'react';
import PropTypes from 'prop-types';

const UserWelcomeText = ({ username }) => (
  <p id="userWelcomeText"><i className="fa fa-user-circle"></i>&nbsp;Logged in as {username}</p>
);
UserWelcomeText.propTypes = {
  username: PropTypes.string.isRequired,
};
export default UserWelcomeText;
