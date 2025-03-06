/*
    Using State Management Library for optimization
    1. redux
    2. recoil
    3. zustand
*/

import React, { useState, createContext, useContext } from "react";

// we generally define context in a separate file and import it where we want to use it
const CountContext = createContext();

function CountContextProvider({ children }) {
  const [count, setCount] = useState(0);
  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}

function Parent() {
  return (
    <CountContextProvider>
      <Increase />
      <Decrease />
      <Value />
    </CountContextProvider>
  );
}

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

function Value() {
  const { count } = useContext(CountContext);
  return <div>Count: {count}</div>;
}

export default Parent;
