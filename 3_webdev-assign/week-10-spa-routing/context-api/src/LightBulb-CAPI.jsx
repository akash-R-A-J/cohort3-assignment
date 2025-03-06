import { useState, createContext, useContext } from "react";

/* CONTEXT-API */

// stores all the context related to the bulb
const BulbContext = createContext();

// creating a component to hide the direct use of context
function BulbProvider({ children }) {
  const [bulbOn, setBulbOn] = useState(true);
  return (
    <>
      {/*components which are wrapped inside BulbContext.Provider can use the value stored there  */}
      <BulbContext.Provider
        // here we are passing-down an object to the child
        value={{
          bulbOn: bulbOn,
          setBulbOn: setBulbOn,
        }}
      >
        {children}
      </BulbContext.Provider> 
    </>
  );
}

function Light() {
  return (
    <>
      {/*components which are wrapped inside BulbContext.Provider can use the value stored there  */}
      <BulbProvider>
        {/* these components are simply passed as childrens */}
        <BulbState />
        <ToggleBulbState />
      </BulbProvider>
    </>
  );
}

// using the bulbcontext
function BulbState() {
  const { bulbOn } = useContext(BulbContext);
  return <>{bulbOn ? "Bulb: On" : "Bulb: Off"}</>;
}

function ToggleBulbState() {
  const { setBulbOn } = useContext(BulbContext);
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

export default Light;
