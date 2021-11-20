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
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
  refreshToken,
  selectIsAuthenticated,
} from "../../services/slices/user";
import ProtectedRoute from "../protected-route/protected-route";

const App = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    dispatch(refreshToken());
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute
          path="/login"
          exact
          isAllowed={!isAuthenticated}
          redirectionPath="/"
        >
          <Login />
        </ProtectedRoute>
        <ProtectedRoute
          path="/register"
          exact
          isAllowed={!isAuthenticated}
          redirectionPath="/"
        >
          <Register />
        </ProtectedRoute>
        <ProtectedRoute
          path="/forgot-password"
          exact
          isAllowed={!isAuthenticated}
          redirectionPath="/"
        >
          <ForgotPassword />
        </ProtectedRoute>
        <ProtectedRoute
          path="/reset-password"
          exact
          isAllowed={!isAuthenticated}
          redirectionPath="/"
        >
          <ResetPassword />
        </ProtectedRoute>
        <Route exact path="/ingredients/:id">
          <Ingredient />
        </Route>
        <ProtectedRoute
          path="/"
          exact
          redirectionPath="/login"
          isAllowed={isAuthenticated}
        >
          <Main />
        </ProtectedRoute>
        <ProtectedRoute
          path="/profile"
          exact
          redirectionPath="/login"
          isAllowed={isAuthenticated}
        >
          <Profile />
        </ProtectedRoute>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
