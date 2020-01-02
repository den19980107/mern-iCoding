import React, { Component } from 'react';

import { Router, Route } from "react-router-dom";
import UserProvider from "./context/UserProvider";
import history from "./history";

import MenuBar from './components/MenuBar'
import Home from "./pages/Home";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import _ from "lodash";

class AppRouter extends Component {
  state = {
    isLogin: false,
    user: {}
  }

  componentDidMount() {
    fetch("http://localhost:5000/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        this.setState({
          user: responseJson.user,
          isLogin: true
        })
      })
      .catch(error => {
        console.log(error)
      });
  }

  render() {

    return (
      <Router history={history}>
        {
          !this.state.isLogin && history.push('/login')
        }
        <UserProvider>
          <Route path="/" component={MenuBar} />
          <Route path="/home" component={Home} />
        </UserProvider>
        <Route path="/login" render={props => (
          <Login isLogin={this.state.isLogin} ></Login>
        )}></Route>
        <Route path="/register" render={props => (
          <Register ></Register>
        )}></Route>
      </Router>
    )
  }
}


export default AppRouter;