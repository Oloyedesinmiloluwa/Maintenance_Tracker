import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer id="fix-footer">
    <div className="social">
      <Link id="documentation" to="api-docs">Documentation</Link>
      <ul>
        <li id="social-label">
          <p>Find us:</p>
        </li>
        <li>
          <Link to="#">
            <i className="fa fa-facebook-square"></i>
          </Link>
        </li>
        <li>
          <Link to="#">
            <i className="fa fa-twitter-square"></i>
          </Link>
        </li>
        <li>
          <Link to="#">
            <i className="fa fa-linkedin-square"></i>
          </Link>
        </li>
        <li>
          <Link to="#">
            <i className="fa fa-instagram"></i>
          </Link>
        </li>
      </ul>
    </div>
    <p className="text-center">&copy; M-tracker.com </p>
  </footer>
);
export default Footer;
