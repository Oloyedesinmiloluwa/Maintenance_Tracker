import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer id="fix-footer">
    <div className="social">
      <a id="documentation" href="api-docs">Documentation</a>
      <ul>
        <li id="social-label">
          <p>Find us:</p>
        </li>
        <li>
          <a href="https://www.facebook.com/oloyede.sinmiloluwa">
            <i className="fa fa-facebook-square"></i>
          </a>
        </li>
        <li>
          <a href="https://twitter.com/Oloyedesinmilo2">
            <i className="fa fa-twitter-square"></i>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/sinmiloluwa-oloyede-749077106/">
            <i className="fa fa-linkedin-square"></i>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/sinmiloluwasunday/">
            <i className="fa fa-instagram"></i>
          </a>
        </li>
      </ul>
    </div>
    <p className="text-center">&copy; M-tracker.com </p>
  </footer>
);
export default Footer;
