/* 
    CONDITIONAL RENDERING

    - sometimes we want to render a component, sometimes we don't.
*/

import { useState, useEffect } from "react";

// conditional rendering
function CondRend() {
  let [visible, setVisible] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setVisible((visible) => !visible);
    }, 5000);
  }, []);

  // if visible is true then we render Counter else we do not.
  return <div>{visible ? <Counter></Counter> : null}</div>;
}

function Counter() {
  console.log("counter");
  const [count, setCount] = useState(0);

  // this logic (mounting, unmounting) runs only if dependency array is empty
  useEffect(() => {
    // mounting
    console.log("on mount");
    const intervalId = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);

    // unmounting
    return () => {
      console.log("on unmount");
      clearInterval(intervalId);
    };
  }, []);

  function increment() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Count: {count}</h1>
      {/* <button onClick={increment}>Increment</button> */}
    </div>
  );
}

export default CondRend;
