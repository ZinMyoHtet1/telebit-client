function startWebSocket(callback) {
  new Promise(() => {
    const uploadSessionId = Date.now().toString();
    sessionStorage.setItem("uploadSessionId", uploadSessionId);

    const socket = new WebSocket("ws://localhost:4040");

    socket.onopen = () => {
      socket.send(JSON.stringify({ uploadSessionId }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      callback(data);
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      socket.close();
    };
  });
}

export { startWebSocket };
