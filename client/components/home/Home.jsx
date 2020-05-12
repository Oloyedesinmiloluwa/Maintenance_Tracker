import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from '../common/Footer';
import helper from '../../helpers';
import Nav from '../common/Navigation';

const Home = ({ userName }) => (
  <div>
    {!userName ? <Nav Tab1={helper('')} Tab2={helper('signin')} Tab3={helper('signup')} />
    : <Nav user = {userName} Tab1={helper('')} Tab2={helper('welcome')} Tab3={helper('signout')} />
    }
    <div className="welcome-div">
      <h1 className="text-center" id="home-logo">M-Tracker</h1>
      <h3 className="text-center">Make your repair request fast </h3>
    </div>
    <p className="text-center" id="how-it-works">~ How it works ~</p>
    {/* <div class="cardjkk">
      <div class="card-inner">

  <div class="large"> hello </div>
   <div class="small"> what </div>
    </div>
  </div> */}
    <div className="lightly-darker-container">
      <div className="cards" id="carder" >
        <div className="card-wrapper">
          <div className="inner-card">
            <div className="card" id="front">
              <div className="mini-card-text"><i className="fa fa-eye"></i></div>
              <div className="card-content">
                <h3><Link to="/requests">You see<br />a fault</Link></h3>
              </div>
            </div>
            <div className="card" id="back">
              <p> It could be a damaged chair, a fault laptop or an equipment that needs maintenance</p>
            </div>
          </div>
        </div>
        <div className="card-wrapper">
          <div className="inner-card">
            <div className="card" id="front">
            <div className="mini-card-text"><i className="fa fa-envelope"></i></div>
              <div className="card-content">
              <h3><Link to="/requests">You make<br />a request</Link></h3>
              </div>
            </div>
            <div className="card" id="back">
              <p> Please be explicit, you should give it a short title and choose the right category</p>
            </div>
          </div>
        </div>
        <div className="card-wrapper">
          <div className="inner-card">
            <div className="card" id="front">
            <div className="mini-card-text"><i className="fa fa-envelope-open"></i></div>
              <div className="card-content">
              <h3><Link to="/requests">We see<br />the request</Link></h3>
              </div>
            </div>
            <div className="card" id="back">
              <p> Your request will have a status of pending at this point, please be patient while we see into it</p>
            </div>
          </div>
        </div>
        <div className="card-wrapper">
          <div className="inner-card">
            <div className="card" id="front">
            <div className="mini-card-text"><i className="fa fa-gavel"></i></div>
              <div className="card-content">
              <h3><Link to="/requests">We act<br />on it</Link></h3>
              </div>
            </div>
            <div className="card" id="back">
              <p> Here your request will change status, please look out for it</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="lightly-dark-container">
      <p className="text-center" id="status-header">~ Monitor Your Request ~</p>
      <div className="status-div">
        <p className="text-center underline">Your request can either be</p>
        <ul className="status">
          <li>Pending&nbsp;&nbsp;<i className="fa fa-pause"></i></li>
          <li>Approved&nbsp;&nbsp;<i className="fa fa-thumbs-up"></i></li>
        </ul>
        <ul className="status">
          <li>Disapproved&nbsp;&nbsp;<i className="fa fa-thumbs-down"></i></li>
          <li>Resolved&nbsp;&nbsp;<i className="fa fa-check"></i></li>
        </ul>
      </div>
    </div>
    <div className="lightly-darker-container">
      <p className="text-center styled-text" >....We handle repair or maintenance request the finest and fastest way</p>
      {!userName ? <div id="get-started"><Link to="/signup">GET STARTED</Link></div>
        : <div id="get-started"><Link to="/requests">View Requests</Link></div>
      }
    </div>
    <Footer />
  </div>
);
Home.propTypes = {
  userName: PropTypes.string,
};
export default Home;
