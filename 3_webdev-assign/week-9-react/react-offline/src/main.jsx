import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import State from "./State.jsx";
import Dynamic from "./DynamicPost.jsx";
import Notification from "./Notification.jsx";
import Tab from "./LinkedInTab.jsx";
import Cleanup from "./Cleanup.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  // <App />
  <Cleanup />
  // </StrictMode>,
);
