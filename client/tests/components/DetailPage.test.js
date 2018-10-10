import React from 'react';
import { shallow } from 'enzyme';
import DetailPage from '../../components/request/DetailPage';
import { requests } from '../_mocks_/mockData';

describe('Test DetailPage component', () => {
  it('it should render properly', (done) => {
    const wrapper = shallow(<DetailPage request = {requests[0]} isAdmin />);
    expect(wrapper.find('img').length).toEqual(1);
    expect(wrapper.find('p').length).toEqual(6);
    expect(wrapper.find('select').length).toEqual(1);
    expect(wrapper.find('button').length).toEqual(1);
    done();
  });
  it('it should render properly when logged in user is not an admin', (done) => {
    const wrapper = shallow(<DetailPage request = {requests[0]} />);
    expect(wrapper.find('MessageText').length).toEqual(1);
    expect(wrapper.find('button').length).toEqual(2);
    expect(wrapper.find('button').get(0).props.children).toEqual('Edit');
    done();
  });
});
