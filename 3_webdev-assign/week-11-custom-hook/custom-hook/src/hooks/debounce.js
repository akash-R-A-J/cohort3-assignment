// import { useEffect, useRef, useState } from "react";

function searchBackend() {
  console.log("request sent to backend");
  // fetch request goes here
}

// my-work
// function debounceSearchBackend() {
//   // whenever gets called start a clock for 30ms
//   // if during those 30ms, if I get called again,
//   // then I will restart the clock, else I will call the backend
//   console.log("request sent to debounceSearchBackend");
//   const ref = useRef(null);
//   const [state, setState] = useState(true);
//   setState(flag => !flag);
//   useEffect(() => {
//     ref.current = setTimeout(searchBackend, 30);
//     return () => {
//         clearTimeout(ref.current);
//         ref.current = null;
//     }
//   }, [state]);
// }

// class-work : basic debounce function
// we need to convert this into a hook -> useDebounce
let currentClock;
function debounceSearchBackend2() {
  console.log("request sent to debounceSearchBackend");
  clearTimeout(currentClock);
  currentClock = setTimeout(searchBackend, 30);
}

debounceSearchBackend2();
debounceSearchBackend2();
debounceSearchBackend2();
debounceSearchBackend2();
debounceSearchBackend2();
debounceSearchBackend2();
debounceSearchBackend2();
debounceSearchBackend2();
