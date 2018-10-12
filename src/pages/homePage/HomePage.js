import React, { Component } from 'react'
import Header from "../../components/header/Header";
import Footer from '../../components/footer/Footer';

export default class HomePage extends Component {
  constructor(props){
    super(props);
    this.deferredPrompt = {};
  }
  componentWillMount(){
    window.M.AutoInit();
    var instance = window.M.Carousel.init({
      fullWidth: true
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
          <div class="carousel carousel-slider">
            <a class="carousel-item" href="#one!"><img src="https://lorempixel.com/800/400/food/1" /></a>
            <a class="carousel-item" href="#two!"><img src="https://lorempixel.com/800/400/food/2" /></a>
            <a class="carousel-item" href="#three!"><img src="https://lorempixel.com/800/400/food/3" /></a>
            <a class="carousel-item" href="#four!"><img src="https://lorempixel.com/800/400/food/4" /></a>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
