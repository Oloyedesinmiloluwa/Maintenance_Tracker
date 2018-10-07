import React from 'react';
import DetailPage from './DetailPage';
import { connect } from 'react-redux';
import { getSingleRequest, actOnRequest, deleteRequest } from '../../actions/requestAction';
import Nav from '../common/Navigation';
import Footer from '../common/Footer';
import helper from '../../helpers';
import UserWelcomeText from '../common/UserWelcomeText';
export class ManageDetailPage extends React.Component {
    state = {
        currentRequest: {},
        dropDownValue: 'approve',
        message: '',
        color: ''
    };

    componentDidMount() {
      const { history, currentRequest, match } = this.props
      if (currentRequest) this.setState({ currentRequest })
  else this.props.getSingleRequest(match.params.requestId).then((response) => {
    if (response.message === 'Authentication failed') return history.push('/signin');
    this.setState({ currentRequest: response.data })
  });
}
    handleClick = (event) => {
      this.setState({ message: 'Please wait...', color: 'lightblue' });
      const { currentUser, actOnRequestAction, deleteRequest, history} = this.props;
      const { currentRequest, dropDownValue } = this.state;
        if (currentUser.detail.role === 'admin') {
          actOnRequestAction(currentRequest.id, dropDownValue).then((response) => {
            if (response.message === 'Authentication failed') return history.push('/signin');
          this.setState({ message: response.message });
          history.push('/requests');
          });
        }
        else if (event.target.textContent === 'Edit') return history.push(`/requests/${currentRequest.id}/edit`);
        else {
          deleteRequest(currentRequest.id, dropDownValue).then(response => {
            if (response.message === 'Authentication failed') return history.push('/signin');
            this.setState({ message: response.message });
           history.push('/requests');
          })}
    };
    handleChange = (event) => {
        this.setState({ dropDownValue: event.target.value });
    }
    render() {
      const { currentRequest, dropDownValue, message, color } = this.state
      const { currentUser } = this.props;
        return (
          <div>
            <Nav Tab1={helper('new')} Tab2={helper('list')} Tab3={helper('signout')} />
            <UserWelcomeText username = {currentUser.detail.role === 'admin' ? "Admin" :currentUser.detail.firstname } />
            <DetailPage
              dropDownValue={dropDownValue}
              handleClick={this.handleClick}
              handleChange={this.handleChange}
              message = {message}
              color = {color}
              request={currentRequest}
              isAdmin={currentUser.detail.role === 'admin'}
            />
            <Footer />
          </div>
        )
    }
}

const getOneRequest = (requests, id) => {
const request = requests.filter((request) => request.id === parseInt(id));
if (request) return request[0];
else return null;
}
export const mapStateToProps = (state, ownProps) => {
  let request;
  if (state.requests.length > 0) {
    request = getOneRequest(state.requests, ownProps.match.params.requestId);
  }
return {
  currentRequest: request,
  currentUser: state.currentUser,
}
};

export default connect(mapStateToProps, { getSingleRequest, actOnRequestAction: actOnRequest, deleteRequest })(ManageDetailPage);
