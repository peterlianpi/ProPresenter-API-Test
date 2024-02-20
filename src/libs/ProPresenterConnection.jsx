const connectWebSocket = (
  host,
  setConnected,
  setWs,
  setMessage,
  handleAction,
  onCloseCallback
) => {
  // Determine the protocol based on wether the app is served over HTTPS or HTTP
  // const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  const protocol = "ws";
  const webSocket = new WebSocket(`${protocol}://${host}/remote`);

  webSocket.onopen = () => {
    console.log("Connecting to ProPresenter WebSocket");
    setConnected(true);
    setWs(webSocket);
    setMessage(null);

    webSocket.onerror = (error) => {
      console.log("WebSocket error: ", error);
      setConnected(false);
      setWs(null);
    };

    webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessage(data);
      console.log("Received message : ", event.data);

      // Handle different actions
      handleAction(data);
    };

    webSocket.onclose = () => {
      console.log("WebSocket connection closed");
      setConnected(false);
      setWs(null);
      if (onCloseCallback) {
        onCloseCallback();
      }
    };
  };
};

export { connectWebSocket };
