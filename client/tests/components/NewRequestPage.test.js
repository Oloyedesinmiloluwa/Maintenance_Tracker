import React from 'react';
import { shallow } from 'enzyme';
import { NewRequestPage, mapStateToProps } from '../../components/request/NewRequestPage';
import { user, event, requests, spyResolve, spyImageFailed, spyAuthFailed, spyRequestAdded } from '../_mocks_/mockData';

describe('Test NewRequestPage component', () => {
  const match = {
    params: {
      requestId: 2
    }
  };
  const ownProps = {
    match: {
      params: {
        requestId: 2
      }
    }
  };
  it('it should render properly', (done) => {
    const wrapper = shallow(<NewRequestPage
      currentUser={user}
      currentRequest={requests[0]}
      editRequestAction={spyResolve}
      match={match}
      uploadImageAction={spyResolve}
      createRequestAction={spyImageFailed}
      />);
    expect(wrapper.find('UserWelcomeText').length).toEqual(1);
    expect(wrapper.find('NewRequestForm').length).toEqual(1);
    expect(wrapper.find('Footer').length).toEqual(1);
    wrapper.instance().onSubmit();
    wrapper.instance().handleChange(event);
    wrapper.instance().onImageChange(event);
    wrapper.setState({ isEdit: false });
    wrapper.instance().onSubmit();
    wrapper.setProps({ createRequestAction: spyAuthFailed });
    wrapper.instance().onSubmit();
    wrapper.setProps({ createRequestAction: spyRequestAdded });
    wrapper.instance().onSubmit();
    done();
  });
  it('it return props in mapstate to props', (done) => {
    mapStateToProps({ requests }, ownProps);
    ownProps.match.params.requestId = 20;
    mapStateToProps({ requests }, ownProps);
    done();
  });
});
