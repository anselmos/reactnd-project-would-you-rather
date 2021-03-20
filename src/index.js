import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
