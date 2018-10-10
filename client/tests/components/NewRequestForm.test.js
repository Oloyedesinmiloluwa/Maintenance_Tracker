import React from 'react';
import { shallow } from 'enzyme';
import NewRequestForm from '../../components/request/NewRequestForm';
import { requests } from '../_mocks_/mockData';

describe('Test NewRequestForm component', () => {
  it('it should render properly', (done) => {
    const wrapper = shallow(<NewRequestForm request = {requests[0]} counterDisplay = {{}}/>);
    expect(wrapper.find('input').length).toEqual(1);
    expect(wrapper.find('textarea').length).toEqual(1);
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('select').length).toEqual(1);
    done();
  });
});
