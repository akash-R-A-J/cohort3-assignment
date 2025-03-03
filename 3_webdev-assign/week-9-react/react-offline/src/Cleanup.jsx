import { useState, useEffect } from "react";

function Cleanup() {
  const [showTimer, setShowTimer] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setShowTimer((vis) => !vis);
    }, 5000);
  }, []);

  return <div>{showTimer && <Timer />}</div>;
}

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const clockId = setInterval(() => {
      console.log("inside clock");
      setSeconds((s) => s + 1);
    }, 1000);

    // cleanup functions
    // runs when unmount
    return () => {
      clearInterval(clockId);
    };
  }, []);

  return <div>{seconds} seconds elapsed</div>;
};

export default Cleanup;
