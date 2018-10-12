import React, { Component } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import firebase from "../../config/firebase";
import image1 from "../../images/01.jpg";
import image2 from "../../images/02.jpg";
import image3 from "../../images/07.jpg";
import image4 from "../../images/09.jpg";
import image5 from "../../images/10.jpg";
import image6 from "../../images/11.jpg";
import image7 from "../../images/08.jpg";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }
  componentWillMount() {
    window.M.AutoInit();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        this.setState({
          isLoggedIn: true
        });
        this.props.history.push("/dashboard");
      } else {
        // No user is signed in.
        console.log("No user logged in");
        this.setState({
          isLoggedIn: false
        });
      }
    });
  }
  componentDidMount() {
    console.log("function not firing");
  }
  render() {
    return (
      <div>
        <Header />
        <div>
          <div id="index-banner" class="parallax-container">
            <div class="section no-pad-bot">
              <div class="container">
                <br />
                <br />
                <h1 class="header center teal-text text-lighten-2">
                  Women Safety
                </h1>
                <div class="row center">
                  <h5
                    class="header col s12 light"
                    style={{
                      color: "white"
                    }}
                  >
                    Let's make it a priority
                  </h5>
                </div>
                <div class="row center">
                  <button
                    href="http://materializecss.com/getting-started.html"
                    id="download-button"
                    class="btn-large waves-effect waves-light teal lighten-1"
                    onClick={() => {
                      window.M.toast({
                        html: "Click on the Sign Up button to Register"
                      });
                    }}
                  >
                    Come and Join us!
                  </button>
                </div>
                <br />
                <br />
              </div>
            </div>
            <div class="parallax">
              <img
                src={image1}
                alt="Unsplashed background img 1"
                className="responsive-img"
              />
            </div>
          </div>
        </div>
        <div class="row">
        <div class="col s12 m4">
          <div class="icon-block">
            <h2 class="center brown-text"><i class="material-icons">flash_on</i></h2>
            <h5 class="center">Nobody can protect you better than yourself! Trust your instincts and fight back!</h5>

            <p class="light">We did most of the heavy lifting for you to provide a good companion.</p>
          </div>
        </div>

        <div class="col s12 m4">
          <div class="icon-block">
            <h2 class="center brown-text"><i class="material-icons">group</i></h2>
            <h5 class="center">You are our first priority</h5>

            <p class="light">We worship women so it's our first priority to take care of you.</p>
          </div>
        </div>

        <div class="col s12 m4">
          <div class="icon-block">
            <h2 class="center brown-text"><i class="material-icons">settings</i></h2>
            <h5 class="center">Easy to work with</h5>

            <p class="light">We have provided you the app which is the easiest to use.</p>
          </div>
        </div>
      </div>
        <Footer />
      </div>
    );
  }
}
