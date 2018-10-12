import React, { Component } from 'react';
import { Link } from "react-router-dom";

import firebase from "../../config/firebase";
import fire from "firebase";

var db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

export default class Header extends Component {
  constructor(props){
    super(props);
  }
  signInWithGoogle = () => {
    var provider = new fire.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var user = result.user;
      console.log(user);
      const userRef = db.collection("users").doc(user.uid);
      userRef.get().then(doc => {
        if (doc.exists) {
          console.log(doc);
          this.props.history.push("/dashboard");
        } else {
          db.collection("users").doc(user.uid).set({
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL
          }).then(() => {
            this.props.history.push("/dashboard");
            window.M.toast({html: "You have been successfully logged in"});
          }).catch(() => {
            window.M.toast({html: "Unable to create your account. Please, try again"});
          });
        }
      }).catch(function(error) {
          console.log("Error getting document:", error);
          
      });
      // ...
    }).catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
  signInWithFacebook = () => {
    var provider = new fire.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var user = result.user;
      console.log(user);
      const userRef = db.collection("users").doc(user.uid);
      userRef.get().then(doc => {
        if (doc.exists) {
          this.props.history.push("/dashboard");
          window.M.toast({html: "You have been successfully logged in"});
        } else {
          db.collection("users").doc(user.uid).set({
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL
          }).then(() => {
            this.props.history.push("/dashboard");
          }).catch(() => {
            window.M.toast({html: "Unable to create your account. Please, try again"});
          });
        }
      }).catch(function(error) {
          console.log("Error getting document:", error);
          window.M.toast({html: "Please, try again"});
      });
      // ...
    }).catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
  logout = () => {
    firebase.auth().signOut().then(function() {
      window.M.toast({html: "You have been successfully logged out!"})
    }).catch(function(error) {
      // An error happened.
      window.M.toast({html: "Try Again"});
    });
  }
  componentDidMount = () => {
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
                {this.props.isLoggedIn ? 
                  <button class="btn modal-trigger red" onClick={this.logout}>Logout</button> :
                  <button data-target="signinmodal" class="btn modal-trigger green darken-2">Sign up or sign in</button>
                }
                  &nbsp;&nbsp;
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
                }} onClick={this.signInWithGoogle}>
                  <i class="fab fa-google" style={{marginRight: "10px"}}></i> 
                  <b>Login with Google</b>
                </button>
                <button className="btn" style={{background: "#3B5998"}} onClick={this.signInWithFacebook}>
                  <i class="fab fa-facebook-f" style={{marginRight: "10px"}}></i>
                  <b>Login with Facebook</b>
                </button>
              </div>
            </div>
          </div>
    )
  }
}
