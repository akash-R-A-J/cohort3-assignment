import { useState } from "react";

export const Darkmode = () => {
  return (
    <div className="h-screen bg-white dark:bg-black">
      <h1 className="text-black dark:text-white">hi there</h1>
      <button className="dark:text-white"
        onClick={() => {
          document.querySelector("html").classList.toggle("dark");
        }}
      >
        toggle theme
      </button>
    </div>
  );
};

export const Darkmode1 = () => {
  const [darkmode, setDarkmode] = useState(true);
  return (
    <div
      className={`h-screen ${
        darkmode ? "bg-black" : "bg-blue-400"
      } text-white text-center text-3xl`}
    >
      <button
        onClick={() => {
          setDarkmode(!darkmode);
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
};
