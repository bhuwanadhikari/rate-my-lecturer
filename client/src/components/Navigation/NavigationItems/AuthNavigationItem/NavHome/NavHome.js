import React from 'react';
import './NavHome.css';
import '../AuthNavigationItem.css';
import { NavLink } from 'react-router-dom';

import homeIcon from '../../../../../img/navImg/home.svg';

const NavHome = (props) =>{
   return (
      <li className ="AuthNavigationItem">
         <NavLink className="AuthNavLink"  activeClassName = "ActiveLink" to={props.link}>
            <img className="AuthNavIcon" src={homeIcon} alt="Home Icon of CrowApp"/>
         </NavLink>
      </li>
   )
};

export default NavHome;