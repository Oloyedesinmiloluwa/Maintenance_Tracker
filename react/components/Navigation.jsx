import React from 'react';
import { Link } from 'react-router-dom';

  export default ({ Tab1, Tab2, Tab3 }) => (
  <nav role="navigation" className="navContainer">
    <ul className="nav navItem navStart">
      <li><Link to="/">M-Tracker</Link></li>
    </ul>
    <ul className="nav navContainer navEnd">
      <li><Link to={ Tab1[0].path }>{ Tab1[0].text }</Link></li>
      <li><Link to={ Tab2[0].path }>{ Tab2[0].text }</Link></li>
      <li><Link to={ Tab3[0].path }>{ Tab3[0].text }</Link></li>
    </ul>
  </nav>
    )
