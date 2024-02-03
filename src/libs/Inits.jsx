import { useEffect, useState } from "react";
import ClearAll from "../components/ClearAll/ClearAll";
import { useProPresenterData } from "./ProPresenterDataProvider";
import LoginPage from "../components/Login/Login";
import DataManager from "./DataManager";

function Inits() {
  const {
    host,
    setConnected,
    setWs,
    setMessage,
    handleAction,
    handleWebSocketClose,
    connected,
    message: webSocketMessage,
    sendAuthentication,
    fetchData,
    setFetchData,
    isAuthenticated,
    setIsAuthenticated,
    startWebSocketConnection,
  } = useProPresenterData();

  const password =
    localStorage.getItem("password") ||
    import.meta.env.VITE_PROPRESENTER_CONTROL_PASSWORD;

  const [autoConnected, setAutoConnected] = useState(false);
  const [initialMessage, setInitialMessage] = useState(null);

  useEffect(() => {
    console.log("Password : ", password);
  }, [password]);

  useEffect(() => {
    // Function to connect WebSocket when component mounts
    if (!connected && host) {
      startWebSocketConnection();
    }
  }, [connected, host, startWebSocketConnection]);

  useEffect(() => {
    // Set fetchData to true after authentication
    if (isAuthenticated && !fetchData) {
      setFetchData(true);
    }
  }, [isAuthenticated, fetchData, setFetchData]);

  useEffect(() => {
    // Automatically send authentication when connected and not authenticated
    if (
      !isAuthenticated &&
      !autoConnected &&
      connected &&
      password &&
      password.length > 0
    ) {
      sendAuthentication(password);
      setAutoConnected(true);
    }
  }, [
    password,
    connected,
    sendAuthentication,
    autoConnected,
    isAuthenticated,
    setIsAuthenticated,
  ]);

  useEffect(() => {
    // Set authenticated and fetchData to true after successful authentication
    if (connected && webSocketMessage && webSocketMessage.authenticated === 1) {
      // Save initial WebSocket message value for passing to LoginPage
      setInitialMessage((prevMessage) => prevMessage || webSocketMessage);
      setIsAuthenticated(true);
      setFetchData(true);
    }
  }, [webSocketMessage, setFetchData, setIsAuthenticated, connected]);

  // Render LoginPage if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="border rounded-md">
        <LoginPage message={initialMessage} />
      </div>
    );
  }

  console.log({ initialMessage, webSocketMessage });

  return (
    <section>
      <DataManager />
      <div className="relative my-2">
        {connected && initialMessage && initialMessage.authenticated === 1 ? (
          <div className="absolute w-1 h-1 p-4 bg-green-600 rounded-full right-1 top-1"></div>
        ) : (
          <div className="absolute w-1 h-1 p-4 bg-red-600 rounded-full right-1 top-1 "></div>
        )}
      </div>
      {connected && initialMessage && initialMessage.authenticated === 1 && (
        <div>
          Connected to ProPresenter{" "}
          <span>
            {initialMessage.majorVersion}:{initialMessage.minorVersion}:
            {initialMessage.patchVersion}
          </span>
        </div>
      )}
      <ClearAll />
    </section>
  );
}

export default Inits;
