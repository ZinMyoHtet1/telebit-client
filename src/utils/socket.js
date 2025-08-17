function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function startWebSocket(callback) {
  new Promise(() => {
    let uploadSessionId = null;
    uploadSessionId = sessionStorage.getItem("uploadSessionId");
    if (!uploadSessionId) {
      uploadSessionId = getRandomInt(10000000, 99999999);
      sessionStorage.setItem("uploadSessionId", uploadSessionId);
    }

    // const api = "http://localhost:4040";
    const socketApi = "https://telebit-api.onrender.com";
    const socket = new WebSocket(socketApi);

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
