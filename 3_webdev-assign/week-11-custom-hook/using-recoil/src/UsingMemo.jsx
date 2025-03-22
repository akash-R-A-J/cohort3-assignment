import { memo, useState } from "react";

function MemoApp() {
  return <Counter />;
}

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ marginTop: 20 }}>
      <MemoisedIncrease setCount={setCount} />
      <MemoisedDecrease setCount={setCount} />
      <MemoisedValue count={count} />
    </div>
  );
}

// after this(using memo), the component whose props/state changes
// only those component will re-render
const MemoisedValue = memo(Value);
const MemoisedIncrease = memo(Increase);
const MemoisedDecrease = memo(Decrease);

function Value({ count }) {
  console.log("value");
  return <div>Count: {count}</div>;
}

/* 
    we can also use memo inline like this 

    const MemoisedCount = memo(({ count }) => {
      console.log("value");
      return <div>Count: {count}</div>;
    });
*/

function Increase({ setCount }) {
  console.log("increase");
  return (
    <button
      onClick={() => {
        setCount((c) => c + 1);
      }}
    >
      Increase
    </button>
  );
}

function Decrease({ setCount }) {
  console.log("decrease");
  return (
    <button
      onClick={() => {
        setCount((c) => c - 1);
      }}
    >
      Decrease
    </button>
  );
}

export default MemoApp;
