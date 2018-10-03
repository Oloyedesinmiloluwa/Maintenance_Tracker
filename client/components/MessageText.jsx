import React from 'react';

const MessageText = ({ message, color }) => (
  <p id = "messageText" style={{ color: color || 'green' }} className="text-center" >{message}</p>
)
export default MessageText;
