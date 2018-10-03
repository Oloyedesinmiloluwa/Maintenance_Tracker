import React from 'react';

const Footer = () => (
    <footer id="fix-footer">
    <div className="social">
      <a id="documentation" href="api-docs">Documentation</a>
      <ul>
        <li id="social-label">
          <p>Find us:</p>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-facebook-square"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-twitter-square"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-linkedin-square"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-instagram"></i>
          </a>
        </li>
      </ul>
    </div>
    <p className="text-center">&copy; M-tracker.com </p>
  </footer>
);
export default Footer;