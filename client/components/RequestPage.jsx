import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Nav from './Navigation';
import helper from '../helpers';
import RequestList from './RequestList';
import Footer from './Footer';
import  { loadRequests } from '../actions/requestAction';
import UserWelcomeText from './UserWelcomeText';

class RequestPage extends React.Component {
    state = {
        dated: '',
        status: '',
        category: '',
        isLoading: true
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    componentDidMount = () => {
      const { currentUser, loadRequests } = this.props
      if (currentUser.detail.role !== 'admin') loadRequests(false);
      else loadRequests(true);
      this.setState({ isLoading: false });
    }
    onClick = () => {
      this.props.createRequest(this.state);
  }
  onTableClick = (event) => {
      event.preventDefault();
      if (event.target.matches('a')) {
        this.props.history.push(`/requests/${event.target.id}`)
      }
  }
    render() {
      const { currentUser } = this.props;
        return (
          <div>
          <Nav Tab1={helper('home')} Tab2= {helper('new')} Tab3={helper('signout')} />
            <div className="wrapper" >
            <UserWelcomeText username = {currentUser.detail.role === 'admin' ? "Admin" :currentUser.detail.firstname } />
    <p className="text-center" id="request-header">All Requests</p>
    <div id="filter-by">
      <ul className="status-item status-start">
        <li>
          <form id="filter-date">
            <button onClick={this.onClick}>From:</button>
            <input type="date" name="dated" min="2017-01-01" max="2099-12-31" value={this.state.dated} onChange={this.handleChange} />
            <br />
          </form>
        </li>
      </ul>
      <ul className="status-container status-end">
        <li>
          <button>Filter by:</button>
        </li>
        <li>
          <form>
            <select value={this.state.status} onChange={this.handleChange} name="status">
              <option value="">All</option>
              <option value="approved">approved</option>
              <option value="disapproved">disapproved</option>
              <option value="resolved">resolved</option>
              <option value="pending">pending</option>
              <option value="" selected>status</option>
            </select>
          </form>
        </li>
        <li>
          <form>
            <select value={this.state.category} onChange={this.handleChange} name="category">
              <option value="">All</option>
              <option value="general">general</option>
              <option value="electrical">electrical</option>
              <option value="physical">physical</option>
              <option value="mechanical">mechanical</option>
              <option value="electronic">electronic</option>
              <option value="software">software</option>
              <option value="" selected>category</option>
            </select>
          </form>
        </li>
      </ul>
    </div>
      <p className = "text-center" id="filter-message"></p>
      {this.state.isLoading? <div className = "loader"></div> : null}
    <RequestList requests={this.props.requests} onClick={this.onTableClick} />
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
