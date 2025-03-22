import React from "react";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { counterAtom, evenSelector } from "../store/atoms";

function SelectorApp() {
  return (
    <RecoilRoot>
      <Counter />
    </RecoilRoot>
  );
}

// Counter component
function Counter() {
  return (
    <div style={{ marginTop: 20, textAlign: "center" }}>
      <Increase />
      <Decrease />
      <Value />
      <IsEven />
    </div>
  );
}

// Value component -> subscribe to the value of atom
function Value() {
  const count = useRecoilValue(counterAtom);
  return <div>Count: {count}</div>;
}

// IsEven component -> subscribe to value of selector not the atoms
function IsEven() {
  const even = useRecoilValue(evenSelector);
  return <div>Is even? {even ? "True" : "False"}</div>;
}

// Increase button component
function Increase() {
  const setCount = useSetRecoilState(counterAtom);
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

// Decrease button component
function Decrease() {
  const setCount = useSetRecoilState(counterAtom);
  return (
    <button
      onClick={() => {
        setCount((c) => c - 2);
      }}
    >
      Decrease
    </button>
  );
}

export default SelectorApp;
