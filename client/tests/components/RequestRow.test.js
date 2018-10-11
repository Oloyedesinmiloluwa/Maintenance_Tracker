import React from 'react';
import { shallow } from 'enzyme';
import RequestRow from '../../components/request/RequestRow';
import { requests } from '../_mocks_/mockData';

describe('Test RequestRow component', () => {
  it('it should render properly', (done) => {
    const wrapper = shallow(<RequestRow request = {requests[0]} />);
    expect(wrapper.find('tr').length).toEqual(1);
    expect(wrapper.find('Link').length).toEqual(1);
    expect(wrapper.find('td').length).toEqual(5);
    done();
  });
});
