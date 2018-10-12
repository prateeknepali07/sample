import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Header extends Component {
  componentDidMount(){
    window.M.AutoInit();
  }
  render() {
    return (
          <div>
            <nav className="grey darken-4">
              <div className="nav-wrapper container">
                <Link to="/" className="brand-logo">VOMAkSh</Link>
                <a data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons" style={{color: "white", cursor: "pointer"}}>menu</i></a>
                <div id="nav-mobile" className="right hide-on-med-and-down">
                  <button data-target="signinmodal" class="btn modal-trigger green darken-2">Sign up or sign in</button>&nbsp;&nbsp;
                  <Link to="/about" className="btn blue">About</Link>
                </div>
              </div>
            </nav>
            <ul class="sidenav" id="mobile-demo">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
            <div id="signinmodal" class="modal" style={{
              padding: "10px"
            }}>
              <a class="modal-close waves-effect waves-green btn-flat right"><i class="fas fa-times"></i></a>
              <div class="modal-content center-align" style={{
                padding: "35px"
              }}>
                <h4 style={{
                  marginBottom: "30px"
                }}>Sign Up or Sign In</h4>
                <button className="btn" style={{
                  marginRight: "20px",
                  background: "#db3236"
                }}>
                  <i class="fab fa-google" style={{marginRight: "10px"}}></i> 
                  <b>Login with Google</b>
                </button>
                <button className="btn" style={{background: "#3B5998"}}>
                  <i class="fab fa-facebook-f" style={{marginRight: "10px"}}></i>
                  <b>Login with Facebook</b>
                </button>
              </div>
            </div>
          </div>
    )
  }
}
