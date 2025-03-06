// understanding recoil-library for better state management

import React from "react";
import { RecoilRoot, atom, useRecoilValue, useSetRecoilState } from "recoil";

const countState = atom({
  key: "countState", // unique Id (with respect to other atoms/selectors)
  default: 0, // defaul value (aka initial value)
});

function RecoilComponent() {
  return (
    <RecoilRoot>
      <Increase />
      <Decrease />
      <Value />
    </RecoilRoot>
  );
}

function Increase() {
  const setCount = useSetRecoilState(countState);
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
  const setCount = useSetRecoilState(countState);
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
  const countValue = useRecoilValue(countState);
  return <div>Count: {countValue}</div>;
}

export default RecoilComponent;
