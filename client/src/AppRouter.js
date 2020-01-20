import React, { Component } from 'react';

import { Router, Route } from "react-router-dom";
import UserProvider from "./context/UserProvider";
import history from "./history";
import PrivateRoute from './routes/PrivateRoute';

import MenuBar from './components/MenuBar/MenuBar'
import Home from "./pages/Home";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import _ from "lodash";
import Class from './pages/Class/Class';
import { register } from 'ts-node';
import CreateClass from './pages/CreateClass/CreateClass';

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
        {/* <UserProvider>
          <Route path="/" component={MenuBar} />
          <PrivateRoute authed={this.state.isLogin} exact path='/' component={Home} />
          <PrivateRoute authed={this.state.isLogin} exact path='/class' component={Class} />
        </UserProvider> */}
        <UserProvider>
          <Route path="/" component={MenuBar} />
          <Route exact path="/" component={Home} />
          <Route exact path="/class" component={Class} />
          <Route exact path="/createClass" component={CreateClass} />
        </UserProvider>

        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Router>
    )
  }
}


export default AppRouter;