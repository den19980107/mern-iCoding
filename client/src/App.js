import React, { Component } from "react";
import AppRouter from "./AppRouter";
class App extends Component {
  componentWillMount() {
    document.body.style.backgroundColor = "rgb(243,243,241)";
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }
  render() {
    return (
      <AppRouter />
    );
  }
}

export default App;
