import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
        <nav>
            <div class="nav-wrapper">
            <a href="#" class="brand-logo">Logo</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
            </div>
        </nav>
    )
  }
}
