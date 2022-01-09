import React, { useEffect, useCallback } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
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
import Modal from "../modal/modal";
import * as H from "history";
import OrderDetails from "../../pages/order-details/order-details";
import OrdersList from "../../pages/orders-list/orders-list";
import Layout from "../layout/layout";
import IngredientDetails from "../ingredient-details/ingredient-details";

const App = () => {
  const history = useHistory();
  const location = useLocation<{ background?: H.Location }>();
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const canResetPassword = useAppSelector(selectCanResetPassword);

  let background = location.state && location.state.background;

  const handleLoad = useCallback(async () => {
    await dispatch(refreshToken());
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  const onModalClose = (href: string) => {
    history.push(href);
  };

  return (
    <div>
      <Switch location={background || location}>
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
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/ingredients/:id">
          <Ingredient />
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
          <OrdersList />
        </ProtectedRoute>
        <ProtectedRoute
          path="/profile/orders/:id"
          exact
          redirectionPath="/login"
          isAllowed={isAuthenticated}
        >
          <Layout>
            <OrderDetails />
          </Layout>
        </ProtectedRoute>
        <Route path="/feed" exact>
          <OrdersFeed />
        </Route>
        <Route path="/feed/:id" exact>
          <Layout>
            <OrderDetails />
          </Layout>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      {background && (
        <Route path="/profile/orders/:id">
          <Modal open={true} onClose={() => onModalClose("/profile/orders")}>
            <OrderDetails style={{ marginTop: 0, minWidth: 640 }} />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/feed/:id">
          <Modal open={true} onClose={() => onModalClose("/feed")}>
            <OrderDetails style={{ marginTop: 0, minWidth: 640 }} />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/ingredients/:id">
          <Modal open={true} onClose={() => onModalClose("/")}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </div>
  );
};

export default App;
