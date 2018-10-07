import React from 'react';
import PropTypes from 'prop-types';

const options = ['General', 'Electrical', 'Physical', 'Mechanical', 'Electronic', 'Software'];
const NewRequestForm = ({ request, handleChange }) => (
    <div className="addrequest-form">
      <div className="category-div">
        <p className="category-p-textarea">Title</p><input id="title-input" name="title" value={request.title} onChange={handleChange} placeholder="Title" />
      </div>
      <p className="counter"></p>
      <div className="textarea-div">
        <p className="description-p-textarea">Description</p>
        <textarea id="description-input" name="description" rows="3" value={request.description} onChange={handleChange} placeholder="...write detailed description of the fault"></textarea>
      </div>
      <p className="counter"></p>
      <div className="category-div">
        <p className="category-p-textarea">Category</p>
        <form>
          <select id="category-input" value={request.category} onChange={handleChange} name="category">
          {options.map((option, index) => <option key={index} value={option}>{option}</option>)}
          </select>
        </form>
      </div>
    </div>
);
NewRequestForm.propTypes = {
  request: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
};
export default NewRequestForm;
