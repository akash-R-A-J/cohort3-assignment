import React from "react";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { counterAtom } from "../store/atoms"; // importing atoms

// main Component
function RecoilApp() {
  return (
    <RecoilRoot>
      <Increase />
      <Decrease />
      <Value />
    </RecoilRoot>
  );
}

// Value component using recoil
function Value() {
  // here this component subscribe to the counterAtom atom
  // and whenever the value of this atom changes, this component will re-render
  const value = useRecoilValue(counterAtom);
  return <div>Count: {value}</div>;
}

// Increase component using recoil
function Increase() {
  // here this component will only subscribe to the setter, not the atom,
  // so whenever atom changes, this component will not re-render
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

// Decrease component using recoil
function Decrease() {
  // here this component will only subscribe to the setter, not the atom,
  // so whenever atom changes, this component will not re-render
  const setCount = useSetRecoilState(counterAtom);
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

export default RecoilApp;
