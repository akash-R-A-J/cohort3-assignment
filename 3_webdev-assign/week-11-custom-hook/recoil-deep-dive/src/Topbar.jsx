import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  jobsAtom,
  messagingAtom,
  networkAtom,
  notificationsAtom,
  totalCountSelector,
} from "./atoms";

// Using hard-coded values

// 3 hooks -> useRecoilValue, useSetRecoilState, useRecoilState

export function Topbar() {
  // using atoms
  const networkCount = useRecoilValue(networkAtom);
  const jobsCount = useRecoilValue(jobsAtom);
  const messagingCount = useRecoilValue(messagingAtom);
  const notificationsCount = useRecoilValue(notificationsAtom);

  // using selectors
  const totalCount = useRecoilValue(totalCountSelector);

  return (
    <div style={{ marginTop: 50 }}>
      <button>Home</button>

      <button>My Network ({networkCount >= 100 ? "99+" : networkCount})</button>
      <button>Jobs ({jobsCount >= 100 ? "99+" : jobsCount})</button>
      <button>
        Messaging ({messagingCount >= 100 ? "99+" : messagingCount})
      </button>
      <button>
        Notifications ({notificationsCount >= 100 ? "99+" : notificationsCount})
      </button>

      {/* using selectors */}
      <button>Me ({totalCount})</button>

      {/* <ButtonUpdator /> */}
    </div>
  );
}

// it just increase the messaging count
// function ButtonUpdator() {
//   const setMessagingCount = useSetRecoilState(messagingAtom);
//   return (
//     <button
//       onClick={() => {
//         setMessagingCount((c) => c + 1);
//       }}
//     >
//       {" "}
//       Me{" "}
//     </button>
//   );
// }
