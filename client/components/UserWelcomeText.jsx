import React from 'react';

const UserWelcomeText = ({ username }) => (
  <p id="userWelcomeText"><i className="fa fa-user-circle"></i>&nbsp;Logged in as {username}</p>
)
export default UserWelcomeText;
