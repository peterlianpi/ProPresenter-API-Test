/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Center from "../Center";
import { useProPresenterData } from "../../libs/ProPresenterDataProvider";
import { connectWebSocket } from "../../libs/ProPresenterConnection";

function LoginPage() {
  const {
    host,
    setHost,
    password,
    setPassword,
    sendAuthentication,
    connected,
    message,
    setConnected,
    setWs,
    setMessage,
    handleAction,
    handleWebSocketClose,
  } = useProPresenterData();
  const [myHost, setMyHost] = useState(host || "");
  const [myPassword, setMyPassword] = useState(password || "");
  const [errorMessage, setErrorMessage] = useState(message);
  const [connectionError, setConnectionError] = useState(null);

  // Connect to WebSocket when host changes

  useEffect(() => {
    if (host && !connected) {
      connectWebSocket(
        host,
        setConnected,
        setWs,
        setMessage,
        handleAction,
        handleWebSocketClose
      );
    }
  }, [host]);

  const handleAuthenticate = () => {
    if (connected) {
      sendAuthentication(password);
    }
    // Check if the WebSocket connection is established
    if (!connected) {
      setConnectionError(`WebSocket connection to ${host} is not established`);
      setTimeout(() => {
        setConnectionError(null);
      }, 2000);
    } else if (message && !message.authenticated) {
      setErrorMessage(message);
      setTimeout(() => {
        setConnectionError(null);
      }, 5000);
    }
  };

  return (
    <Center>
      <div className="flex flex-col p-5 mx-auto rounded w-[300px]">
        <h1 className="pb-4 text-xl font-semibold">Login Page</h1>
        <div className="relative my-2">
          {connected ? (
            <div className="absolute w-1 h-1 p-4 bg-green-600 rounded-full right-1 top-1"></div>
          ) : (
            <div className="absolute w-1 h-1 p-4 bg-red-600 rounded-full right-1 top-1 "></div>
          )}

          <input
            className="w-full"
            type="text"
            placeholder="hostname or ip:port"
            value={host}
            onChange={(ev) => setHost(ev.target.value)}
          />
        </div>
        <input
          className="mb-2"
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        {/* Display connection error message if present */}
        {connectionError && (
          <div className="p-2 mb-2 text-sm text-center text-red-600 bg-gray-100 border">
            {connectionError}
          </div>
        )}
        {/* Display error message if present */}
        {message && !message.authenticated && (
          <div className="p-2 mb-2 text-sm text-center text-red-600 bg-gray-100 border">
            {message.error}
          </div>
        )}

        <button
          type="button"
          className="bg-blue-600"
          onClick={handleAuthenticate}
        >
          Authenticate
        </button>
      </div>
    </Center>
  );
}
export default LoginPage;
