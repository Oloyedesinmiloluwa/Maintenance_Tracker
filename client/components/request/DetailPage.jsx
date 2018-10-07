import React from 'react';
import image from '../../../vanilla/assets/image/repair2.png';
import { setStatus } from '../../helpers';
import MessageText from '../common/MessageText';

const formatDate = (dated) => {
  const date = new Date(dated);
  return date.toLocaleDateString();
};

const DetailPage = ({
  request, isAdmin, handleClick, handleChange, dropDownValue, message, color
}) => (
  <div>
    <div>
      <div id="detail-card" className="show-detail-card">
        <div className="display-card">
          <img src={request.image || image} />
          <div className="card-content">
            <h3 id="title-label">{request.title}&nbsp;&nbsp;<i className={setStatus(request.status)}></i></h3>
          </div>
        </div>
      </div>
      <div className="addrequest-form">
        <p className="description-label">Description:</p> <p id="description-label" className="description-p">{request.description}</p>
        <p className="description-label">Category:</p> <p id="category-label" className="description-p">{request.category}</p>
        <p className="description-label">Date:</p><p id="date-label" className="description-p">{formatDate(request.dated)}</p>
      </div>
      <MessageText {...{ message, color }}/>
      <div className="description-btn">
        {isAdmin && <select value={dropDownValue} onChange={handleChange}>
          <option value="approve">Approve</option>
          <option value="disapprove">Disapprove</option>
          <option value="resolve">Resolve</option>
        </select>}
        <button onClick={handleClick} id="edit-btn" >{isAdmin ? 'Update Status' : 'Edit'}</button>
        {!isAdmin && <button onClick={handleClick} id="delete-btn" >Delete</button>}
      </div>
    </div>
  </div>
);
export default DetailPage;
