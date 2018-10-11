import React from 'react';
import { shallow } from 'enzyme';
import FilterForm from '../../components/request/FilterForm';

describe('Test Footer component', () => {
  it('it should render properly', (done) => {
    const wrapper = shallow(<FilterForm />);
    expect(wrapper.find('Dropdown').length).toEqual(2);
    expect(wrapper.find('button').length).toEqual(2);
    expect(wrapper.find('input').length).toEqual(1);
    done();
  });
});
