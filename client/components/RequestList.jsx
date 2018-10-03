import React from 'react';
import RequestRow from './RequestRow';

export default ({ requests, onClick }) => (
    <table onClick={onClick}>
        <thead>
        <tr><th>Title</th><th>Description</th><th>Category</th><th>Date</th><th>Status</th></tr>
        </thead>
        <tbody>
        {requests.map(request => <RequestRow key={request.id} request={request} />)}
        </tbody>
    </table>
);
