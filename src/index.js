import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { StateProvider } from "./contexts/StateProvider";
import reducer from "./contexts/reducer";
import { initialState } from "./contexts/StateProvider";

ReactDOM.render(
  // <React.StrictMode>
  <StateProvider initialState={initialState} reducer={reducer}>
    <ToastProvider
      autoDismiss
      autoDismissTimeout={5000}
      placement="bottom-left"
    >
      <App />
    </ToastProvider>
  </StateProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
