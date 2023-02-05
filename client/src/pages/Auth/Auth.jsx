import React, { useState } from "react";
import "./Auth.css";
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";

import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { signup, login } from "../../actions/auth";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    // console.log(isSignUp)
    setIsSignUp(!isSignUp);
    // console.log("::",isSignUp)
  };

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(isSignUp){
      dispatch(signup({name,email,password}, navigate));
    }else{
      dispatch(login({email, password}, navigate));
    }
    
    if(isSignUp & !name){
      alert("Enter a name to container")
    }
    //if login or sign in with name
    else if(!email){
      alert("Enter email to container")
    }
    else if(!password){
      alert("Enter password to container")
    }
    
    console.log({name, email, password})
  }

  return (
    <section className="auth-section">
      { isSignUp && <AboutAuth/>}
      <div className="auth-container-2">
        {!isSignUp && (
          <img src={icon} alt="stack overflow" className="login-logo" />
        )}
      
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <label htmlFor="name">
            <h4>Dispaly Name</h4>
            <input type="text" id="name" name="name" onChange={(e) => {setName(e.target.value)}} />
          </label>
        )}

        <label htmlFor="email">
          <h4>Email</h4>
          <input type="email" name="email" id="email" onChange={(e) => {setEmail(e.target.value)}}/>
        </label>
        <label htmlFor="Password">
          <div style={{display:"flex", justifyContent:"space-between"}}>
            <h4>Password</h4>
            {!isSignUp && <h4  style={{color:"#007ca6", fontSize:'13px'}}>forgot password?</h4>}
          </div>
          <input type="Password" name="Password" id="Password" onChange={(e) => {setPassword(e.target.value)}}/>
          {isSignUp && (
            <p style={{color:"#666767", fontSize:"13px"}}>
              Passwords must contain at least eight <br />
              characters, including at least 1 letter <br /> and 1 number
            </p>
          )}
        </label>
        {isSignUp && (
          <label htmlFor="check">
            <input type="checkbox" id="check" />
            <p style={{fontSize:"13px"}}>
              Opt-in to recieve occasional <br /> product updates, user resaerch
              invitations, <br />
              company announces, and digests.
            </p>
          </label>
        )}
        <button type="submit" className="auth-btn">
          {isSignUp ? "Sign Up" : "Log in"}
        </button>
        {
          isSignUp && (
            <p style={{color:"#666767", fontSize:"13px"}}>
              By clicking "Sign Up", you agree to our 
              <span style={{color:"#007ca6"}}> terms of<br/>  services</span>, 
              <span style={{color:"#007ca6"}}> privacy policy</span> and 
              <span style={{color:"#007ca6"}}> cookie policy</span>
            </p>
          )
        }
      </form>
      <p>
        {isSignUp ? "Already have an account?" : "Don't have an account?"}
        <button
          type="button"
          className="handle-switch-btn"
          onClick={handleSwitch}
        >
          {isSignUp ? "Log in" : "SignUp"}
        </button>
      </p>
      </div>
    </section>
  );
};

export default Auth;
