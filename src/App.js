import React, { Component } from 'react';
import { BrowserRouter , Route } from 'react-router-dom';
import './App.css';
import HomePage from "./pages/homePage/HomePage";
import About from "./pages/about/About"
import Dashboard from './pages/dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
            <Route path="/" component={HomePage} exact />
            <Route path="/about" component={About} />
            <Route path="/dashboard" component={Dashboard} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
