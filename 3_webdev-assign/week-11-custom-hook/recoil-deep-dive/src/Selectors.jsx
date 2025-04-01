import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import { allNotificationsSelector, allNotificationsAtom } from "./atoms";
import { useEffect } from "react";

// USING DATA FROM THE BACKEND - unoptimal way

export function TopbarSelector() {
  // using atoms
  const [allNotifications, setAllNotifications] =
    useRecoilState(allNotificationsAtom);

  useEffect(() => {
    // fetch data from the backend
    async function fetchData() {
      try {
        const res = await axios.get(
          // not returning data
          "http://localhost:5000/notifications"
        );

        setAllNotifications(res.data);
      } catch (error) {
        console.error("error: ", error);
      }
    }

    fetchData();
  }, []);

  // using selectors
  const totalCount = useRecoilValue(allNotificationsSelector);

  return (
    <div style={{ marginTop: 50 }}>
      <button>Home</button>

      <button>
        My Network (
        {allNotifications.network >= 100 ? "99+" : allNotifications.network})
      </button>
      <button>
        Jobs ({allNotifications.jobs >= 100 ? "99+" : allNotifications.jobs})
      </button>
      <button>
        Messaging (
        {allNotifications.notifications >= 100
          ? "99+"
          : allNotifications.notifications}
        )
      </button>
      <button>
        Notifications (
        {allNotifications.messaging >= 100 ? "99+" : allNotifications.messaging}
        )
      </button>

      <button>Me ({totalCount})</button>
    </div>
  );
}
