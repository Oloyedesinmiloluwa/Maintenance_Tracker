import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({
  options, handleChange, value, defaultValue, name
}) => (
    <select value={value} onChange={handleChange} name={name}>
      <option value="">select {defaultValue}</option>
      {options.map((option, index) => <option key={index} value={option}>{option}</option>)}
      <option value="">none</option>
    </select>
);
Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
export default Dropdown;
