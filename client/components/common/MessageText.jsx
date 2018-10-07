import React from 'react';
import PropTypes from 'prop-types';

const MessageText = ({ message, color }) => (
  <p id = "messageText" style={{ color: color || 'green' }} className="text-center" >{message}</p>
);
MessageText.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
export default MessageText;
