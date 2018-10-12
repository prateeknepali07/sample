import React, { Component } from 'react'
import Header from "../../components/header/Header";
import Footer from '../../components/footer/Footer';
import firebase from "../../config/firebase"

export default class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }
  componentWillMount(){
    window.M.AutoInit();
    var instance = window.M.Carousel.init({
      fullWidth: true
    });
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
  componentDidMount(){
    console.log("function not firing");
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container" style={{
          marginTop: "15px"
        }}>
          check
        </div>
        <Footer />
      </div>
    )
  }
}
