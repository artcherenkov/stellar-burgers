import React from "react";
import ReactDOM from "react-dom";
import "@ya.praktikum/react-developer-burger-ui-components";

import App from "./components/app/app";
import { store } from "./services/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
