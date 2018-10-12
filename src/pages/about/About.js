import React, { Component } from 'react'
import Header from '../../components/header/Header';

export default class About extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          This is About Page
        </div>
      </div>
    )
  }
}
