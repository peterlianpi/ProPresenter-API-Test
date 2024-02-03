import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProPresenterDataContextProvider } from "./libs/ProPresenterDataProvider.jsx";
import ConnectionNotification from "./components/Notification/ConnectionNotification.jsx";
import Center from "./components/Center.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProPresenterDataContextProvider>
      <ConnectionNotification />
      <Center>
        <App />
      </Center>
    </ProPresenterDataContextProvider>
  </React.StrictMode>
);
