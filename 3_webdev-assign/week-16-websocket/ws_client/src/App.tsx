import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    if (!socket || !inputRef.current) return;
    socket.send(inputRef.current.value);
  };

  // on mount, connect to ws server
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    if (!ws) return;

    setSocket(ws);
    ws.onmessage = (event) => {
      alert(event.data);
    };

    // cleanup on unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <input type="text" ref={inputRef} name="message" id="" />
      <input type="button" value="send" onClick={sendMessage} />
    </div>
  );
}

export default App;
