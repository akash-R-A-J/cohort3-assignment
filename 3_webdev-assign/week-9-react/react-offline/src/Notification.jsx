import { useState, useEffect, useRef } from "react";

function Notification() {
  console.log("notification");
  const [count, setCount] = useState(1);
  const notificationRef = useRef(null);

  // every 5 sec the count should increase by 1
  function increment() {
    setCount((c) => c + 1);
  }

  // this will increase count by 1 every 5 sec
  useEffect(() => {
    // runs on mount
    if (!notificationRef.current) {
      notificationRef.current = true;
      //   side-effect
      setInterval(() => {
        setCount((c) => c + 1);
      }, 5000);
    }
  }, []);

  return (
    <div>
      - Click on the notification image to increase the notifications!
      <br />
      <br />
      <div
        style={{
          background: "red",
          borderRadius: 20,
          width: 20,
          height: 25,
          paddingLeft: 10,
          paddingTop: 5,
          marginLeft: 20,
        }}
      >
        {count}
      </div>
      <img
        onClick={increment}
        style={{ cursor: "pointer" }}
        src={
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAADl5eWWlpYwMDD8/Pzz8/PR0dH39/dKSkro6Ojd3d2BgYFubm61tbXt7e1hYWGqqqp3d3eMjIwnJyeXl5fFxcW/v78bGxvMzMxERESdnZ3e3t4SEhI0NDRbW1tpaWmvr687OztOTk6FhYUiIiLAaLHaAAAES0lEQVR4nO2diXbiMAxFa0pI2MtWWjrdy///4kCZDltiTCLpOem7X+B74siLbPnmhhBCCCGEEEIIIeRakqyf9rME3Qw10sHcbZkPUnRTVEi7bk/3Ed0ceQbumAG6QcJkXXdKN0M3SpJkdSbo3KpJEWeYI+jcEN0sOUa5gs6N0A2TInsoMFw35VecFAg6N0E3TYjzOPo/nqKbJsO4UNC5MbpxIhTFmebEmieP4RO6cSLcegwX6MaJ4DO8RTdOBBrWHxrWn6aPFq1R8aRtM20b/UE3sBKd5dRj98N02UE3tByd0V2A3o67Uf0mqI/D52C/b95qtfuWvL9cp/fNfFKXjZuOL3j6WdThj8zK+214XkS/sfF+5e937viOVvCSlvn/TmnHm9XITnfuyzKNtKs+roUEnVvfo2XykPqAO+JL3PQ+RAWd++ihlY65F/bbElVPrTQGFhLR0kr2F9wTzc+YnzuTIJL8W/gi6Xru0HJbXhUFnXtF6+l+wS3wrxiyTVGNKVbQt1MoxQwp6EucyQFMwfVNBJ3rowQ7cyPDOWpzQzuM7nnDCBYfsZAHcmijZSjoHGIt9Wlq+GkvaNlHt5j3U98hGR2s46n+bO0U49mbbZjZ0TI11F0y5WO6kEoBgs5Z7oXbzWYOMVwqWs24T7GbgdsH0h1m4dR+LPzBKtuvs/8bgtUesVyO6VrWNoKYoWKHzYDxBTT8MjEsuj1hgUk3RXZSm246gxpaHNf0HTXUx2Ctjxvud+gP+hr57GvQP+CH/Q0tshiIte8h6kuoBCzonrWPaKIDjX6oQQca/WM21hvB52hvDaNDqX4wRYdS/WDaRgu6F2VDtN8GGtLQTwet57TTbPgpjfakpofWc9opfUTe8BTdPCINLaAhDWmIh4Y0pCEeGtKQhnhoSEMa4qEhDWmIh4Y0pCEeGtKQhnhoSEMa4qEhDWmIh4Y09NP8M1FLtN6GpaYg6pr6MYqX1nvIy5V7HvT6qUQdZAnaWvdmbKsK+VC6hYiqpJCHSnWFBdrqCIVnlGwKCIYjXmoQe4M7D+HLpH/QPjmIvt9iViHxGkSrKUqXI5fhRW5YxF9Yy0esNhay1IcfoYLfuII7lxEpyRPDgqkYgWExvoHwmMrFTmJY1PupuJTKYhwIj6k2LCbYUi1hdKsMi3qvHkjyVl4Qf/k+jPJX9OP/CXfMSxviL9+H0aYhDaOHhjSMHxr+ZsM4Uk2XeSht2GvVg8geEiSEEEJ+G63bEGwfkJElLCUQ70vjlwlLjtf5G4YVIUQ3shIh66/ya58YCNk1tyiVr0dIqKlzoLkJSQzUu5OG1I6GPE8pSHIp1qidFTXj0kEH1VPbNvizrJG8D18NXz+te5jZ0SlWbKOeMhZmvCoQXFm9o6ZOkn9EfFj7MHrA/fnIv25AFD0kmRyfUX2ZNOkD/iOd/VzY+JylDfT7Jhn30/64qXaEEEIIIYQQQgjR5C+tF174t+rmKgAAAABJRU5ErkJggg=="
        }
        width={40}
      />
    </div>
  );
}

export default Notification;

// error after closing backend
/*
    [vite] server connection lost. Polling for restart...
client:992 WebSocket connection to 'ws://localhost:5173/' failed: 
ping @ client:992
waitForSuccessfulPing @ client:1011
handleMessage @ client:922
onMessage @ client:299
(anonymous) @ client:447Understand this errorAI
Notification.jsx:4 notification
client:992 WebSocket connection to 'ws://localhost:5173/' failed: 
ping @ client:992
waitForSuccessfulPing @ client:1017Understand this errorAI
Notification.jsx:4 notification
client:992 WebSocket connection to 'ws://localhost:5173/' failed: 
ping @ client:992
waitForSuccessfulPing @ client:1017Understand this errorAI
client:992 WebSocket connection to 'ws://localhost:5173/' failed: 
ping @ client:992
waitForSuccessfulPing @ client:1017Understand this errorAI
Notification.jsx:4 notification
client:992 WebSocket connection to 'ws://localhost:5173/' failed: 
ping @ client:992
waitForSuccessfulPing @ client:1017Understand this errorAI
Notification.jsx:4 notification
client:992 WebSocket connection to 'ws://localhost:5173/' failed: 
ping @ client:992
waitForSuccessfulPing @ client:1017Understand this errorAI
client:992 WebSocket connection to 'ws://localhost:5173/' failed: 
ping @ client:992
waitForSuccessfulPing @ client:1017Understand this errorAI
Notification.jsx:4 notification
client:992 WebSocket connection to 'ws://localhost:5173/' failed: 
ping @ client:992
waitForSuccessfulPing @ client:1017Understand this errorAI
Notification.jsx:4 notification
client:992 WebSocket connection to 'ws://localhost:5173/' failed: 
ping @ client:992
waitForSuccessfulPing @ client:1017Understand this errorAI
client:992 WebSocket connection to 'ws://localhost:5173/' failed: 
ping @ client:992
waitForSuccessfulPing @ client:1017Understand this errorAI
Notification.jsx:4 notification
client:992 WebSocket connection to 'ws://localhost:5173/' failed: 
ping @ client:992
waitForSuccessfulPing @ client:1017Understand this errorAI
Notification.jsx:4 notification
client:992 WebSocket connection to 'ws://localhost:5173/' failed: 
ping @ client:992
waitForSuccessfulPing @ client:1017Understand this errorAI
client:992 WebSocket connection to 'ws://localhost:5173/' failed: 
ping @ client:992
waitForSuccessfulPing @ client:1017Understand this errorAI
Notification.jsx:4 notification
client:992 WebSocket connection to 'ws://localhost:5173/' failed: 
ping @ client:992
waitForSuccessfulPing @ client:1017Understand this errorAI
Notification.jsx:4 notification
client:992 WebSocket connection to 'ws://localhost:5173/' failed: 
ping @ client:992
waitForSuccessfulPing @ client:1017Understand this errorAI
client:992 WebSocket connection to 'ws://localhost:5173/' failed: 
ping @ client:992
waitForSuccessfulPing @ client:1017Understand this errorAI
*/
