import { useState } from "react";

// 100vh -> complete height of the window
function State() {
  return (
    <div style={{ background: "#dfe6e9", height: "100vh" }}>
      <ToggleMessage />
      <ToggleMessage />
      <ToggleMessage />
      <Notification />
      <Notification />
      <Notification />
    </div>
  );
}

const ToggleMessage = () => {
  // raw variable
  // const isVisible = true;
  // state definition -> defining a new state variable
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <button
        onClick={() => {
          setIsVisible(!isVisible);
        }}
      >
        Toggle Message
      </button>
      {isVisible && <p>This Message is conditionally rendered!</p>}
    </div>
  );
};

const Notification = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  function increment() {
    setNotificationCount((c) => c + 1);
  }

  return (
    <div>
      <button onClick={increment}>Increase Count</button>
      {notificationCount}
    </div>
  );
};

export default State;
