import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signOutUser } from '../../actions/loginAction';

export const Nav = ({
  Tab1, Tab2, Tab3, user, signOutUserAction
}) => (
  <nav role="navigation" className="navContainer">
    <ul className="nav navItem navStart">
      <li><Link to="/">M-Tracker</Link></li>
    </ul>
    <ul className="nav navContainer navEnd">
      <li><Link to={Tab1[0].path}>{ Tab1[0].text }</Link></li>
      {!user ? <li><Link to={Tab2[0].path}>{ Tab2[0].text }</Link></li>
      : <li><Link to={Tab2[0].path}><i className="fa fa-user-circle"></i> Welcome {user}</Link></li>}
      <li><Link onClick={signOutUserAction} to={Tab3[0].path}>{ Tab3[0].text }</Link></li>
    </ul>
  </nav>
);
Nav.propTypes = {
  Tab1: PropTypes.array.isRequired,
  Tab2: PropTypes.array.isRequired,
  Tab3: PropTypes.array.isRequired,
  user: PropTypes.string,
  signOutUserAction: PropTypes.func.isRequired,
};
export default connect(null, { signOutUserAction: signOutUser })(Nav);
