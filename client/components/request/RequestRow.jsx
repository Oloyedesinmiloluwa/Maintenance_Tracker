import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setStatus } from '../../helpers';

const formatDate = (dated) => {
  const date = new Date(dated);
  return date.toLocaleDateString();
};
const formatDescription = (text) => {
  return text.length > 80 ? `${text.slice(0, 79)}...` : text;
};
const RequestRow = ({ request }) => (
  <tr><td><Link id={request.id} to="#">{request.title}</Link></td><td>{formatDescription(request.description)}</td><td>{request.category}</td><td>{formatDate(request.dated)}</td><td><i className={setStatus(request.status)}></i></td></tr>
);
RequestRow.propTypes = {
  request: PropTypes.shape({}).isRequired,
};
export default RequestRow;
