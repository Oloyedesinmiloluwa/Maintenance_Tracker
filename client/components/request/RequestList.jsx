import React from 'react';
import PropTypes from 'prop-types';
import RequestRow from './RequestRow';

const RequestList = ({ requests, onClick }) => (
    <table onClick={onClick}>
        <thead>
        <tr><th>Title</th><th>Description</th><th>Category</th><th>Date</th><th>Status</th></tr>
        </thead>
        <tbody>
        {requests.map(request => <RequestRow key={request.id} request={request} />)}
        </tbody>
    </table>
);
RequestList.propTypes = {
  requests: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default RequestList;
