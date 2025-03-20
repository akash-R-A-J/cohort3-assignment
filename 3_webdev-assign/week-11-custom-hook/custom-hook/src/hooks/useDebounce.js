import { useState, useEffect, useRef } from "react";

// it will return a function which will call the given function after 200ms
function useDebounce(sendDataToBackend) {
  const timeout = useRef();

  const fn = () => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(sendDataToBackend, 200);
  };

  return fn;
}

// input: state variable and a delay
// changes state variable only after the delay
export const useDebounce2 = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(()=>{
        const handler = setTimeout(()=>{
            setDebouncedValue(value);
        }, delay);
        
        return ()=>{
            clearTimeout(handler);
        };
    }, [value, delay]);
    
    return debouncedValue;
}


export default useDebounce;
