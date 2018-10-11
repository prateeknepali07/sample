import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        This is Hello React
      </div>
    );
  }
}

export default App;
