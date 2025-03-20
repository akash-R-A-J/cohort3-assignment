import { useState } from "react";

// custom hook - manages count state => state management custom hook
function useCounter() {
  const [count, setCount] = useState(0);

  function increaseCount() {
    setCount((c) => c + 1);
  }

  // returns an object
  return {
    count,
    increaseCount,
  };
}

function Counter() {
  // destructuring the object returned by the custom hook
  const { count, increaseCount } = useCounter();

  return (
    <div>
      <button onClick={increaseCount}>Increase {count}</button>
    </div>
  );
}

export default Counter;
