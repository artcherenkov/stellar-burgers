import React from "react";
import { Redirect, Route, RouteProps, useHistory } from "react-router-dom";

export type ProtectedRouteProps = {
  isAllowed: boolean;
  redirectionPath: string;
} & RouteProps;

const ProtectedRoute = ({
  isAllowed,
  redirectionPath,
  ...routeProps
}: ProtectedRouteProps) => {
  const history = useHistory<{ from?: string }>();

  if (isAllowed) {
    return <Route {...routeProps} />;
  }

  const dynamicRedirectionPath = history.location.state?.from;

  return (
    <Redirect
      to={{
        pathname: dynamicRedirectionPath || redirectionPath,
        state: { from: history.location.pathname },
      }}
    />
  );
};

export default ProtectedRoute;
