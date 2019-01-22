import React, { Component } from "react";
import { Route } from "react-router-dom";

import { AuthWrapper, Login, Register } from "../components/";

class Auth extends Component {
  render() {
    return (
      <AuthWrapper>
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/register" component={Register} />
      </AuthWrapper>
    );
  }
}

export default Auth;
