import { useState } from "react";

/*
    1. Rolling-up the state
    2. Prop-drilling : passing the props to deep nested component 
*/

function LightBulb() {
  const [bulbOn, setBulbOn] = useState(true);
  return (
    <div>
      <BulbState bulbOn={bulbOn} /> <br /> <br />
      <ToggleBulbState setBulbOn={setBulbOn} />
    </div>
  );
}

// state variable is defined here - rolled up
function BulbState({ bulbOn }) {
  return <>{bulbOn ? "Bulb: On" : "Bulb: Off"}</>;
}

// we have to use the above variable in this component
function ToggleBulbState({ setBulbOn }) {
  return (
    <>
      <button
        onClick={() => {
          setBulbOn((on) => !on);
        }}
      >
        Toggle the bulb
      </button>
    </>
  );
}

export default LightBulb;
