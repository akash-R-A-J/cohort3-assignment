import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx"; // 
import { Counter, Timer } from "./Practice.jsx"; // counter, timer
import UseEffect from "./UseEffect.jsx"; // Interval -> useEffect() 
import CondRend from "./ConditionalRendering.jsx"; // conditional rendering
import Basic from "./Basic.jsx"; // dependency array

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Basic />
  // </StrictMode>
);
