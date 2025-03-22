import { useState, useContext, createContext } from "react";

/* Context API vs Recoil */

// both, using normal state variable or using context-api, re-renders all components
// (Increase, Decrease, and Value Components) instead of the component which value only changes and
// that's why we should use external library like recoil to avoid too much re-rendering

function ContextAPI() {
  return (
    <>
      {/* <Counter /> */}
      <CountContextProvider>
        <Increase />
        <Decrease />
        <Value />
      </CountContextProvider>
    </>
  );
}

// using context API
const CountContext = createContext();
function CountContextProvider({ children }) {
  const [count, setCount] = useState(0);

  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}

// Value component -> for context-api
function Value() {
  const { count } = useContext(CountContext);
  return <div>count: {count}</div>;
}

// Increase Component -> for context-api
function Increase() {
  const { setCount } = useContext(CountContext);
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

// Decrease Component -> for context-api
function Decrease() {
  const { setCount } = useContext(CountContext);
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

// using normal state variable
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button setCount={setCount} text="Increment"></Button>
      <Button setCount={setCount} text="Decrement"></Button>
      <CurrentCount count={count} />
    </>
  );
}

// CurrentCount component -> for normal state variable
function CurrentCount({ count }) {
  return <div>Count: {count}</div>;
}

// button component -> for normal state variable
function Button({ setCount, text }) {
  return (
    <button
      onClick={() => {
        text === "Increment" ? setCount((c) => c + 1) : setCount((c) => c - 1);
      }}
    >
      {text}
    </button>
  );
}

export default ContextAPI;
