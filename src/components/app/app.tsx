import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  ForgotPassword,
  Ingredient,
  Login,
  Main,
  NotFound,
  Profile,
  Register,
  ResetPassword,
} from "../../pages";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route exact path="/reset-password">
          <ResetPassword />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/ingredients/:id">
          <Ingredient />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
