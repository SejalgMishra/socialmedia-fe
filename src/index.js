import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DataProvider from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
  {/* <React.StrictMode> */}
    <DataProvider>
        {" "}
        <App />
    </DataProvider>
  {/* </React.StrictMode> */}
  </PersistGate>
    </Provider>
);
 