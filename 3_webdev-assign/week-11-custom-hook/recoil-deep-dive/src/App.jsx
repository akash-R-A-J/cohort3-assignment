import { RecoilRoot } from "recoil";
import { Topbar } from "./Topbar";
import { TopbarSelector } from "./Selectors";
// import { AsyncTopbar } from "./AsyncSelectors"; // uses backend server for fetching data
import { TodoAtomFamily } from "./AtomFamily";
import { TodoSelectorFamily } from "./SelectorFamily";

function App() {
  return (
    <RecoilRoot>
      <TodoSelectorFamily />
    </RecoilRoot>
  );
}

export default App;
