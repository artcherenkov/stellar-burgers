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
  const history = useHistory();

  if (isAllowed) {
    return <Route {...routeProps} />;
  }

  const { pathname, search } = history.location;

  return (
    <Redirect
      to={{
        pathname: redirectionPath,
        state: { prevPath: pathname + search },
      }}
    />
  );
};

export default ProtectedRoute;
