import React from 'react';
import { setStatus } from '../helpers';

const formatDate = (dated) => {
  const date = new Date(dated);
  return date.toLocaleDateString();
};
const RequestRow = ({ request }) => (
  <tr><td><a id={request.id} href="#">{request.title}</a></td><td>{request.description}</td><td>{request.category}</td><td>{formatDate(request.dated)}</td><td><i className={setStatus(request.status)}></i></td></tr>
);
export default RequestRow;
