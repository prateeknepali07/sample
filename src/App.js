import React, { Component } from 'react';
import { BrowserRouter , Route } from 'react-router-dom';
import './App.css';
import HomePage from "./pages/homePage/HomePage";
import About from "./pages/about/About"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
            <Route path="/" component={HomePage} exact />
            <Route path="/about" component={About} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
