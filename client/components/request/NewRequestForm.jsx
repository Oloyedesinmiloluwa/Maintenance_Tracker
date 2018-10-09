import React from 'react';
import PropTypes from 'prop-types';

const options = ['General', 'Electrical', 'Physical', 'Mechanical', 'Electronic', 'Software'];
const NewRequestForm = ({ request, handleChange, counterDisplay }) => (
    <div className="addrequest-form">
      <div className="category-div">
        <p className="category-p-textarea">Title</p><input id="title-input" name="title" value={request.title} onChange={handleChange} placeholder="Title" />
      </div>
      {counterDisplay.title && <p className="counter">{counterDisplay.title}</p>}
      <div className="textarea-div">
        <p className="description-p-textarea">Description</p>
        <textarea id="description-input" name="description" rows="3" value={request.description} onChange={handleChange} placeholder="...write detailed description of the fault"></textarea>
      </div>
      {counterDisplay.description && <p className="counter">{counterDisplay.description}</p>}
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
  counterDisplay: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
export default NewRequestForm;
