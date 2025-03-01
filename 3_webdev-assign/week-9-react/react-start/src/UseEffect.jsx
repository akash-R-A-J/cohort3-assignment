import { useState, useEffect, useRef } from "react";

/*
    useEffect
    
    - the logic inside this hook renders only once at the starting or when 1st rendering happens
    - and ignored from 2nd rendering onwards
    - takes 2 argument : a function and a dependency array
*/

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {}, []);

  return <div></div>;
}

// MOUNTING -> render something only on the first rendering and ingnoring from next rendering
export const Interval = function () {
  // initialize the count to 0 only on first render
  // and ignores it from 2nd render owards
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  console.log("counter");
  // guard our setInterval from re-render
  useEffect(() => {
    // only gets called on the very 1st render
    // and gets ignored from 2nd render onwards
    console.log("setInterval");

    if (!intervalRef.current) {
      // setInterval gets called only once (on 1st rendering)
      intervalRef.current = setInterval(() => {
        // setCount gets called after every 1s
        setCount((count) => count + 1);
      }, 1000);
    }
  }, []);

  // rest the timer/count to 0
  function reset() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setCount(0);
  }

  function increment() {
    setCount(count + 1);
  }

  return (
    // dynamic variables in react are the variables which are used below or variables used in return statement
    // e.g. count is a dynamic variable and when it changes the react render this component
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Counter;
