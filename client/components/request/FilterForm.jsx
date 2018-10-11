import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../common/Dropdown';

const FilterForm = ({
  dated, onClick, handleChange, status, category
}) => (
    <div id="filter-by">
      <ul className="status-item status-start">
        <li>
          <form id="filter-date">
            <button disabled onClick={onClick}>Get from:</button>
            <input type="date" name="dated" min="2017-01-01" max="2099-12-31" value={dated} onChange={onClick} />
            <br />
          </form>
        </li>
      </ul>
      <ul className="status-container status-end">
        <li>
          <button onClick={onClick}>Filter <i className="fa fa-arrow-circle-right"></i></button>
        </li>
        <li>
          <form>
            <Dropdown
              handleChange={handleChange}
              name="status"
              value={status}
              options={['approved', 'disapproved', 'resolved', 'pending']}
              defaultValue="status"
            />
          </form>
        </li>
        <li>
          <form>
            <Dropdown
              handleChange={handleChange}
              name="category"
              value={category}
              options={['general', 'electrical', 'physical', 'mechanical', 'electronic', 'software']}
              defaultValue="category"
            />
          </form>
        </li>
      </ul>
    </div>
);
FilterForm.propTypes = {
  dated: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default FilterForm;
