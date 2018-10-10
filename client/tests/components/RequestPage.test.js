import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { RequestPage } from '../../components/request/RequestPage';
import { user, event, requests } from '../_mocks_/mockData';

describe('Test Dropdown component', () => {
  const spy = sinon.spy(() => Promise.resolve({ success: true }));
  const history = {
    push: () => '/',
    location: {
      pathname: '/',
    },
  };
  it('it should render properly', (done) => {
    const wrapper = shallow(<RequestPage
    currentUser = {user}
    loadRequests = {spy}
    requests ={requests[0]}
    />);
    expect(wrapper.find('FilterForm').length).toEqual(1);
    expect(wrapper.find('Footer').length).toEqual(1);
    done();
  });
  it('it should render properly if the user is an admin', (done) => {
    user.detail.role = 'admin';
    const wrapper = shallow(<RequestPage
    currentUser = {user}
    createRequest={spy}
    history={history}
    loadRequests={spy}
    requests ={[]}
    />);
    expect(wrapper.find('FilterForm').length).toEqual(1);
    expect(wrapper.find('Footer').length).toEqual(1);
    wrapper.instance().handleChange(event);
    wrapper.instance().onClick(event);
    wrapper.instance().onTableClick(event);
    done();
  });
  it('it should call onclick event', (done) => {
    user.detail.role = 'admin';
    const wrapper = shallow(<RequestPage
    currentUser = {user}
    createRequest={spy}
    history={history}
    loadRequests={spy}
    requests ={[]}
    />);
    event.target.textContent = 'Filter';
    wrapper.setState({ category: 'electrical', status: 'dfdf' });
    wrapper.instance().onClick(event);
    event.target.name = 'dated';
    wrapper.instance().onClick(event);
    expect(wrapper.state().category).toEqual('electrical');
    done();
  });
});
