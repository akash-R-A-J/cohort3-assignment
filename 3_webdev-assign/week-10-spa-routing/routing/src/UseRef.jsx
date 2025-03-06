import { useState, useEffect, useRef } from "react";

/*
    Use-Cases of useRef()
    1. focusing on an element - DOM Ref
    2. scroll to bottom - DOM Ref
    3. clock with start and stop functionality - Value Ref
 */

function UseRef() {
  return (
    //   <Input />
    <Clock />
  );
}

function Input() {
  const inputRef = useRef();

  // way-1 to use useRef: for DOM
  function focusOnInput() {
    // document.getElementById("name").focus();
    inputRef.current.focus(); // for avoiding touching DOM directly
  }
  return (
    <div>
      Sign up
      <input ref={inputRef} type="text" />
      <input type="text" />
      <button onClick={focusOnInput}>Submit</button>
    </div>
  );
}

function Clock() {
  const [count, setCount] = useState(0);
  // if you use a raw variable here instead of useRef,
  // the variable gets re-rndered everytime the clock starts/count updates
  //   let count = 0; // this value gets overridden every time the component re-renders
  const countId = useRef();

  useEffect(() => {
    startCounter(); // start counter on mount
    return () => clearInterval(countId.current); // cleanup on unmount
  }, []);

  function startCounter() {
    if (!countId.current) {
      countId.current = setInterval(() => {
        setCount((c) => c + 1);
      }, 1000);
    }
  }

  function stopCounter() {
    clearInterval(countId.current);
    countId.current = null;
  }

  function resetCounter() {
    stopCounter();
    setCount(0);
  }

  return (
    <div>
      <p> Count: {count} </p>
      <button onClick={startCounter}>Start</button>
      <button onClick={stopCounter}>Stop</button>
      <button onClick={resetCounter}>Reset</button>
    </div>
  );
}

export default UseRef;
