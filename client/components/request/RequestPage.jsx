import React from 'react';
import { connect } from 'react-redux';
import Nav from '../common/Navigation';
import helper from '../../helpers';
import RequestList from './RequestList';
import Footer from '../common/Footer';
import  { loadRequests } from '../../actions/requestAction';
import UserWelcomeText from '../common/UserWelcomeText';
import FilterForm from './FilterForm';

export class RequestPage extends React.Component {
    state = {
        dated: '',
        status: '',
        category: '',
        isLoading: true,
        filterMessage: '',
        noRequestMessage: '',
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    componentDidMount = () => {
      const { currentUser, loadRequests, history } = this.props
      if (currentUser.detail.role !== 'admin') loadRequests(false, ' ').then((res) => {
        if (res.message === 'Authentication failed') return history.push('/signin');
        this.setState({ isLoading: false });
      });
      else loadRequests(true, ' ').then((res) => {
        if (res.message === 'Authentication failed') return history.push('/signin');
        this.setState({ isLoading: false });
      });
    }
    onClick = (event) => {
      const { loadRequests, currentUser } = this.props
      const  { detail: {role}} = currentUser;
      const { status, category } = this.state
      event.preventDefault();
      this.setState({ [event.target.name]: event.target.value });
      this.setState({ filterMessage: '' });
      if (event.target.name === 'dated' ){
        const dateValue = event.target.value;
        let valueAsDate = event.target.valueAsDate.toDateString();
        loadRequests(role === 'admin',`?dated=${dateValue}`).then(response => {
        this.setState({ filterMessage: `Displaying requests from ${valueAsDate}` });
        response.data.length < 1 ? this.setState({ noRequestMessage: 'No result found' }) : this.setState({ noRequestMessage: '' });
      });
    }
      else if (event.target.textContent.startsWith('Filter')) {
        const isAdmin = role === 'admin';
        loadRequests(isAdmin,`?status=${status}&category=${category}`).then(response => {
          if (status && category) this.setState({ filterMessage: `Result filtered by ${status} &  ${category}` });
          else if (status || category) this.setState({ filterMessage: `Result filtered by ${status}${category}` });
          else this.setState({ filterMessage: 'You must select a value to filter by' });
          response.data.length < 1 ? this.setState({ noRequestMessage: 'No result found' }) : this.setState({ noRequestMessage: '' });
        });
      }
    }
  onTableClick = (event) => {
    const { history } = this.props
      event.preventDefault();
      if (event.target.matches('a')) {
        history.push(`/requests/${event.target.id}`)
      }
  }
  render() {
    const { currentUser, requests } = this.props;
    const { status, category, dated, isLoading, filterMessage, noRequestMessage } = this.state
      return (
        <div>
          <Nav Tab1={helper('home')} Tab2={helper('new')} Tab3={helper('signout')} />
          <div className="wrapper" >
            <UserWelcomeText username={currentUser.detail.role === 'admin' ? "Admin" : currentUser.detail.firstname} />
            <p className="text-center" id="request-header">All Requests</p>
            <FilterForm
            status = {status}
            dated = {dated}
            category = {category}
            handleChange = {this.handleChange}
            onClick = {this.onClick}
            />
            <p className="text-center" id="filter-message">{filterMessage}</p>
            {isLoading ? <div className="loader"></div> : null}
            {requests[0] ? <RequestList requests={requests} onClick={this.onTableClick} />
              : <p className="card-no-result text-center">{noRequestMessage || 'You have not made any request yet. Please feel free to do so when you have'}</p>
            }
            <p className="text-center" id="page-num"></p>
            <div className="pagination">
              <button disabled><i className="fa fa-arrow-circle-left"></i> Prev</button>
              <button>Next <i className="fa fa-arrow-circle-right"></i> </button>
            </div>
            < Footer />
          </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
  requests: state.requests,
  currentUser: state.currentUser,
  });
export default connect(mapStateToProps, { loadRequests })(RequestPage);
