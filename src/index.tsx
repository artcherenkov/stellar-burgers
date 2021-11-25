import React from "react";
import ReactDOM from "react-dom";
import "@ya.praktikum/react-developer-burger-ui-components";

import App from "./components/app/app";
import { store } from "./services/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
