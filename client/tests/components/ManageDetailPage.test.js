import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { ManageDetailPage, mapStateToProps } from '../../components/request/ManageDetailPage';
import { user, requests, event } from '../_mocks_/mockData';

describe('Test ManageDetailPage component', () => {
  const state = {
    requests,
  };
  const ownProps = {
    match: {
      params: {
        requestId: 2
      }
    }
  };
  it('it should render properly', (done) => {
    const spy = sinon.spy(() => Promise.resolve({ message: 'I am working' }));
    const wrapper = shallow(<ManageDetailPage
    currentUser = {user}
    currentRequest={requests}
    deleteRequest={spy}
    />);
    expect(wrapper.find('UserWelcomeText').length).toEqual(1);
    expect(wrapper.find('DetailPage').length).toEqual(1);
    expect(wrapper.find('Footer').length).toEqual(1);
    wrapper.instance().handleChange(event);
    wrapper.instance().handleClick(event);
    done();
  });
  it('should call actOnRequest action when user is an admin', (done) => {
    const spy = sinon.spy(() => Promise.resolve({ message: 'I am working' }));
    user.detail.role = 'admin';
    const wrapper = shallow(<ManageDetailPage
    currentUser = {user}
    currentRequest={requests}
    actOnRequestAction={spy}
    />);
    wrapper.instance().handleChange(event);
    wrapper.instance().handleClick(event);
    expect(wrapper.state().message).toEqual('Please wait...');
    expect(spy).toHaveProperty('callCount', 1);
    done();
  });
  it('it return props in mapstate to props', (done) => {
    mapStateToProps(state, ownProps);
    ownProps.match.params.requestId = 20;
    mapStateToProps(state, ownProps);
    done();
  });
});
