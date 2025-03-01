// dependency array

import { useState, useEffect } from "react";

export default function Basic() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  function increment() {
    setCount1((c) => c + 1);
  }

  function decrement() {
    setCount2((c) => c - 1);
  }

  return (
    <div>
      {/* passing count as a prop to the Counter component */}
      <Counter count1={count1} count2={count2} />
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <div>After Counter</div>
    </div>
  );
}

function Counter(props) {
  // it runs only once as dependency array is empty
  useEffect(() => {
    console.log("mount");

    return () => {
      console.log("unmount");
    };
  }, []);

  //  it will run/re-render only when count1 changes
  useEffect(() => {
    console.log("count1 has changed");
  }, [props.count1]);

  //  it will run/re-render only when count2 changes
  useEffect(() => {
    console.log("count2 has changed");

    /* cleanup
        1st render -> `count2 has changed` gets logged
        2nd render -> before logging `count2 has changed`, the logic inside the return function will get executed
            i.e 1st `cleanup when second effect` gets logged and then `count2 has changed` gets logged in 2nd rendering
        3rd render -> before logging `count2 has changed`, the logic inside the return function will get executed
            i.e 1st `cleanup when second effect` gets logged and then `count2 has changed` gets logged in 3nd rendering
    
        and so on... 
    */

    return () => {
      console.log("cleanup when second effect");
    };
  }, [props.count2]);

  // it will run/re-render if any state variable changes
  useEffect(() => {
    console.log("count1 or count2 has changed");
  }, [props.count1, props.count2]);

  return (
    <div>
      Counter-1 : {props.count1} <br />
      Counter-2 : {props.count2} <br />
    </div>
  );
}
