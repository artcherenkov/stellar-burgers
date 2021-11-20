import React, { useEffect } from "react";
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
import { useAppDispatch } from "../../services/hooks";
import { refreshToken } from "../../services/slices/user";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, []);

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
