import React from 'react';
import './Landing.css';
import androidbg from '../../img/backImages/androidbg2.jpg';
import desktopbg from '../../img/backImages/desktopbg2.jpg';
import Button from '../ui/Button/Button';
//import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const Landing = (props) => {
   const match = matchMedia("(min-width: 450px)");

   const backImg = match.matches?desktopbg:androidbg;

   const onSignupHandler = (e) => {
      e.preventDefault();
      props.history.push('/sign-up');
   };

   const onLoginHandler = (e) => {
      e.preventDefault();
      props.history.push('/login');
   };

   return(
      <div className="Landing">
         <img src={backImg} alt="Background of CrowApp"/>
         <div className="Container">
            <div className="TopCommand">
               CrowApp
            </div>
            <Button cls = "Success" clicked = {onSignupHandler} >Sign Up</Button>
            <Button cls = "Success" clicked = {onLoginHandler} >Log In</Button>
            <div className="Command">
               Confused?? Log In to Find Top Rated Hotels
            </div>

         </div>
      </div>
   )
};



Landing.propTypes = {
   auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
   auth: state.auth
});

export default connect(mapStateToProps)(Landing);
