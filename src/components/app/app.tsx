import React, { useEffect, useCallback } from "react";
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
  selectIsAuthenticated,
  getUser,
  refreshToken,
  selectCanResetPassword,
} from "../../services/slices/user";
import ProtectedRoute from "../protected-route/protected-route";

const App = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const canResetPassword = useAppSelector(selectCanResetPassword);

  const handleLoad = useCallback(async () => {
    await dispatch(refreshToken());

    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    handleLoad();
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
          isAllowed={canResetPassword}
          redirectionPath="/"
        >
          <ResetPassword />
        </ProtectedRoute>
        <Route exact path="/ingredients/:id">
          <Ingredient />
        </Route>
        <Route exact path="/">
          <Main />
        </Route>
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
