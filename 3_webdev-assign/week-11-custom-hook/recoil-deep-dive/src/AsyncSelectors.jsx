import { useRecoilValue } from "recoil";
import { allNotificationsAtom, totalCountSelector } from "./atoms-async";

export function AsyncTopbar() {
  // using atom
  const allNotificationsCount = useRecoilValue(allNotificationsAtom);
  const totalCount = useRecoilValue(totalCountSelector);

  return (
    <div style={{ marginTop: 40 }}>
      <button>Home</button>

      <button>
        My Network (
        {allNotificationsCount.network >= 100
          ? "99+"
          : allNotificationsCount.network}
        )
      </button>
      <button>
        Jobs (
        {allNotificationsCount.jobs >= 100 ? "99+" : allNotificationsCount.jobs}
        )
      </button>
      <button>
        Messaging (
        {allNotificationsCount.notifications >= 100
          ? "99+"
          : allNotificationsCount.notifications}
        )
      </button>
      <button>
        Notifications (
        {allNotificationsCount.messaging >= 100
          ? "99+"
          : allNotificationsCount.messaging}
        )
      </button>

      <button>Me ({totalCount})</button>
    </div>
  );
}
