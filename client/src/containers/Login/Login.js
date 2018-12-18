import React, {Component} from 'react';

import Button from '../../components/ui/button/Button';
import loginIcon from '../../img/navImg/login-solid.svg';
import './Login.css';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';

class Login extends Component{
   constructor(){
      super();
      this.state = {
         email: '',
         password: '',
         errors: {}
      }
   }

   onChangeHandler = (e) => {
      this.setState({[e.target.name] : e.target.value})
   };

   onClickHandler = (e) => {
      e.preventDefault(); //prevents from default submission
      const userData = {
         email: this.state.email,
         password: this.state.password
      };
      this.props.loginUser(userData);
   };

   componentWillReceiveProps(nextProps){
      if(nextProps.auth.isAuthenticated){
         this.props.history.push('./dashboard');
         console.log(this.props.history);
      }

      if(nextProps.errors){
         this.setState({errors: nextProps.errors});
      }

   }

   render(){
      return (
         <div className= "FormBox">
            <img className="LoginIcon" src={loginIcon} alt="Log In Icon for the CrowApp"/>

            <form className="Form" >

               <input
                  className="Input"
                  type="email"
                  placeholder = "Email"
                  onChange = {this.onChangeHandler}
                  name = "email"
                  value = {this.state.email}
               />

               {this.state.errors.email? (<div className="errorFeedback">{this.state.errors.email}</div>):null}

               <input
                  className="Input"
                  type="password"
                  placeholder = "Password"
                  onChange = {this.onChangeHandler}
                  name = "password"
                  value = {this.state.password}
               />
               {this.state.errors.password? (<div className="errorFeedback">{this.state.errors.password}</div>):null}

            </form>

            <Button cls = "Success" value = "Log In" clicked={this.onClickHandler} />

         </div>
      )
   }
}

Login.propTypes = {
  loginUser : propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth,
   errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
