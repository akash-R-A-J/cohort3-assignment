import { useEffect, useRef } from "react";

// it returns first, effect gets called later
export const usePrev = (value) => {
  const ref = useRef(); // initially value is undefined
  console.log("re-render happened with new value " + value);

  // update the ref whenever value changes
  useEffect(() => {
    console.log("updated the ref to be " + value);
    ref.current = value;
  }, [value]);

  console.log("returned " + ref.current);
  return ref.current;
};

/* 
    how control-flow reaches in the above hook
   
    1. "re-render happened with new value " + value
    2. "returned " + ref.current
    3. "updated the ref to be " + value
    
    -> this hook will return first whatever the value is stored
        inside the ref variable and the effect gets called.

*/
