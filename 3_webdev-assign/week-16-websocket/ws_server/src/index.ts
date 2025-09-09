import { WebSocketServer, type WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

// event handler
wss.on("connection", (ws: WebSocket) => {
  ws.on("error", console.error);

  ws.on("open", () => {
    console.log("ws is now open");
  });

  ws.on("message", (data: WebSocket.RawData) => {
    console.log(data.toString());
    if (data.toString() === "ping") {
      ws.send("pong");
    }
  });

  ws.on("close", () => {
    console.log("closing the ws connection");
  });

  ws.send("something from the server!"); // on connection
});
