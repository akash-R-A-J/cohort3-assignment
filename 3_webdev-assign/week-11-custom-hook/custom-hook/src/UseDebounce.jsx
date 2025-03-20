import { useEffect, useState } from "react";
import useDebounce, { useDebounce2 } from "./hooks/useDebounce";

function UseDebounce() {
  const [inputVal, setInputVal] = useState("");
  const debouncedValue = useDebounce2(inputVal, 300);
  
  useEffect(()=>{
    // expensive operation
    console.log("backend gets called");
  }, [debouncedValue]);

  return (
    <>
      <input type="text" onChange={(e) => {setInputVal(e.target.value)}}></input>
    </>
  );
}

export default UseDebounce;
