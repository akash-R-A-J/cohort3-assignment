import { RecoilRoot } from "recoil";
import { ProfileCard } from "./ProfileCard";
import { ProfileCard2 } from "./Built";
function App() {
  return (
    <RecoilRoot>
      <ProfileCard />
      {/* <ProfileCard2/> */}
    </RecoilRoot>
  );
}

export default App;
