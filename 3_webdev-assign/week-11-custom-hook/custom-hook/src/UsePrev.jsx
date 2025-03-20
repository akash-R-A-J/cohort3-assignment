import { useState } from "react";
import { usePrev } from "./hooks/usePrev";

export const Prev = () => {
  const [state, setState] = useState(0);
  const prev = usePrev(state);

  return (
    <>
      <Body {...{ state, setState, prev }} />
    </>
  );
};

const Body = ({ state, setState, prev }) => {
  return (
    <>
      <p>{state}</p>
      <button
        onClick={() => {
          setState((s) => s + 1);
        }}
      >
        Increment
      </button>
      <p>Previous value {prev}</p>
    </>
  );
};
