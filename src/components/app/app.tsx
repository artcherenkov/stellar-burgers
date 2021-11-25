import React, { useEffect, useCallback } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
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
import OrdersFeed from "../../pages/orders-feed/orders-feed";

const App = () => {
  const dispatch = useAppDispatch();
  const history = useHistory<{ prevPath?: string }>();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const canResetPassword = useAppSelector(selectCanResetPassword);

  const handleLoad = useCallback(async () => {
    await dispatch(refreshToken());

    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem(
      "initial-path",
      history.location.state?.prevPath || "/"
    );

    handleLoad();
  }, []);

  return (
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
      <ProtectedRoute
        path="/profile/orders"
        exact
        redirectionPath="/login"
        isAllowed={isAuthenticated}
      >
        <OrdersFeed />
      </ProtectedRoute>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default App;
