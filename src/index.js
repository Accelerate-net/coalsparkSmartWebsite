import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { StateProvider } from "./contexts/StateProvider";
import reducer from "./contexts/reducer";
import { initialState } from "./contexts/StateProvider";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  // <React.StrictMode>

  <StateProvider initialState={initialState} reducer={reducer}>
  <ToastContainer
	position="bottom-center"
	autoClose={4000}
	hideProgressBar={false}
	newestOnTop={false}
	closeOnClick
	rtl={false}
	pauseOnFocusLoss
	draggable
	pauseOnHover
	/>
	<App />
  </StateProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
