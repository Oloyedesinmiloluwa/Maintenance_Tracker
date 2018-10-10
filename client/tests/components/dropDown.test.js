import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from '../../components/common/Dropdown';

describe('Test Dropdown component', () => {
  const options = ['approved', 'disapproved','resolved', 'pending'];
  it('it should render properly', (done) => {
    const wrapper = shallow(<Dropdown options = {options} />);
    expect(wrapper.find('select').length).toEqual(1);
    expect(wrapper.find('option').length).toEqual(6);
    done();
  });
});
