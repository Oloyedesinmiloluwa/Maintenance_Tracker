import React from 'react';
import { shallow } from 'enzyme';
import RequestList from '../../components/request/RequestList';
import { requests } from '../_mocks_/mockData';

describe('Test Home component', () => {
  it('it should render properly', (done) => {
    const wrapper = shallow(<RequestList requests = {requests} />);
    expect(wrapper.find('table').length).toEqual(1);
    expect(wrapper.find('thead').length).toEqual(1);
    expect(wrapper.find('RequestRow').length).toEqual(2);
    expect(wrapper.find('th').length).toEqual(5);
    done();
  });
});
