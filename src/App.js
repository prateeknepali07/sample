import React, { Component } from 'react';
import { BrowserRouter , Route } from 'react-router-dom';
import './App.css';
import HomePage from "./pages/homePage/HomePage";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={HomePage} exact />
        <Route path="/about" component={About} />
      </BrowserRouter>
    );
  }
}

export default App;
