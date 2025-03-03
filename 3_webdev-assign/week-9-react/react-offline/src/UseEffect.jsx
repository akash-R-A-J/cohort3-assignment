import { useState, useEffect } from "react";

function UseEffect() {
  const [count, setCount] = useState(0);

  // this effect will run on mount, because the dependency array is empty
  useEffect(() => {
    console.log("above set-interval, starting the clock.");
    setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
  }, []);

  // this effect runs everytime the `count` state variable changes
  useEffect(() => {
    console.log("the count has been updated to " + count);
  }, [count]);
}

export default UseEffect;
