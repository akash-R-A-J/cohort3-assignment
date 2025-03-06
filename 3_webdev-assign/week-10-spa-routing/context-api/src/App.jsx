import LightBulb from "./LightBulb"; // using prop-drilling
import Light from "./LightBulb-CAPI"; // using context-api
import Parent from "./Library"; // why conext-api is not optimized
import RecoilComponent from "./Recoil"; // using recoil instead of conext-API

function App() {
  return (
    <>
      <RecoilComponent />
    </>
  );
}

export default App;
