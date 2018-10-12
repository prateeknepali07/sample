import React, { Component , Fragment } from 'react';
import axios from 'axios';
import Header from '../../components/header/Header';
import firebase from '../../config/firebase';
import fire from 'firebase';
import image6 from "../../images/11.jpg";

var db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      photoURL: '',
      phoneNumberReceived: '',
      phoneNumberRelativesReceived: '',
      uid: '',
      isLoading: true
    }
  }
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        db.collection("users").doc(user.uid).get().then(doc => {
          console.log(doc.data());
          let phoneNumberReceived = doc.data().phoneNumberReceived;
          let phoneNumberRelativesReceived = doc.data().phoneNumberRelativesReceived;
          if(!phoneNumberReceived){
            phoneNumberReceived = false;
          }
          if(!phoneNumberRelativesReceived){
            phoneNumberRelativesReceived = false;
          } 
          this.setState({
            name: doc.data().name,
            email: doc.data().email,
            photoURL: doc.data().photoURL,
            phoneNumberReceived,
            phoneNumberRelativesReceived,
            uid: user.uid,
            isLoading: false
          })
        })
        this.setState({
          isLoggedIn: true
        });
      } else {
        // No user is signed in.
        console.log("No user logged in");
        this.setState({
          isLoggedIn: false
        });
        this.props.history.push("/");
      }
    });
  }

  savePhoneNumber = () => {
    db.collection("users").doc(this.state.uid).update({
      phoneNumber: this.state.phoneNumber,
      phoneNumberReceived: true
    }).then(() => {
      console.log("Phone number saved");
    }).catch(() => {
      console.log("Failed")
    })
  }

  saveRealtivePhoneNumber = () => {
    db.collection("users").doc(this.state.uid).update({
      phoneNumberRelatives: this.state.phoneNumber,
      phoneNumberRelativesReceived: true
    }).then(() => {
      console.log("Phone number saved");
    }).catch(() => {
      console.log("Failed")
    })
  }

  recaptchaVerifier = () => {
    window.recaptchaVerifier = new fire.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': function(response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.verifyPhoneNumber()
      }
    });
    // [END appVerifier]
    window.recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
      
    });
  }

  verifyPhoneNumber = () => {
    var phoneNumber = "+91" + this.state.phoneNumber;
    var appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("Check complete");
      }).catch(function (error) {
        // Error; SMS not sent
        // ...
      });
  }

  clickDangerButton = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.createGoogleMap);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
  }

  onChangeHandler = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    console.log(event.target.value);
  }

  createGoogleMap = position => {
    const url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&key=AIzaSyCOpQNtna1iI9EWsSZbDuz7HfgMr6tDGeU";
    axios.get(url)
      .then(function (response) {
        // handle success
        const result = response.data.results[0].formatted_address;
        const newUrl = "https://maps.googleapis.com/maps/api/staticmap?center=" + result + "&zoom=13&scale=1&size=600x300&maptype=roadmap&format=png&visual_refresh=true";
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  render() {
    return (
      <div className="orange" style={{
        height: "700px"
      }}>
        <Header isLoggedIn={true} />
        <div className="container center-align">
        {this.state.isLoading  ?
           <div class="preloader-wrapper big active" style={{
              position: "fixed",
              background: "transparent",
              top: "40%",
              left: "48%"
           }}>
           <div class="spinner-layer spinner-blue">
             <div class="circle-clipper left">
               <div class="circle"></div>
             </div><div class="gap-patch">
               <div class="circle"></div>
             </div><div class="circle-clipper right">
               <div class="circle"></div>
             </div>
           </div>
           </div> : null}
           {this.state.phoneNumberReceived === false ? (
            <div>
              <h5>You haven't added your phone number!! </h5>
              <div className="row">
                <div class="input-field col s8">
                  <input id="phoneNumber" type="tel" className="active" onChange={this.onChangeHandler} />
                  <label for="phoneNumber">Your Phone Number</label>
                </div>
                <button className="btn col s4" style={{
                  marginTop: "15px"
                }} onClick={this.savePhoneNumber}>Add your Phone Number</button>
              </div> 
            </div>         
          ) : <div />}
          {this.state.phoneNumberRelativesReceived === false ? (
            <div>
              <h5>You haven't added your relatives phone number!!</h5>
              <div className="row">
                <div class="input-field col s8">
                  <input id="phoneNumberRelative" type="tel" onChange={this.onChangeHandler} />
                  <label for="phoneNumberRelative">Relative's Phone Number</label>
                </div>
                <button className="btn col s4" style={{
                  marginTop: "15px"
                }} onClick={this.savePhoneNumber}>Add Relative's Phone Number</button>
              </div> 
            </div>         
          ) : <div />}
          {console.log(this.state.phoneNumberReceived, this.state.phoneNumberRelativesReceived)}
          {this.state.phoneNumberReceived && this.state.phoneNumberRelativesReceived ?
            <div style={{
              marginTop: "150px"
            }}>
              <button className="btn red center-align" style={{
                borderRadius: "50%",
                height: "200px",
                width: "200px"
              }} onClick={this.clickDangerButton}>
                <i class="fas fa-exclamation-triangle" style={{
                  fontSize: "100px"
                }}></i>
              </button>  
            </div>: <div />}
        </div>
        <h4 className="center-align red-text">Press the Danger Button if you feel you are in risk.</h4>
      </div>
    )
  }
}
