import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    result: "initial"
  };

  async componentDidMount() {
    const response = await fetch("/api");
    const result = await response.text();
    this.setState({
      result
    });
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
            {this.state.result}
          </a>
        </header>
      </div>
    );
  }
}

export default App;
