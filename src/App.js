import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FoursquareAPI from "./api/"

class App extends Component {
  componentDidMount() {
    FoursquareAPI.search({
      near: "Detroit, MI",
      query: "tacos",
      limit: 10
    }).then(results => console.log(results));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
