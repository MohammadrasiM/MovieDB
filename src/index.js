import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";
import faIR from "antd/lib/locale/fa_IR";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./components/context";
ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <ConfigProvider direction locale={faIR}>
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
