import { atom, selector } from "recoil";
import axios from "axios";

// ASYNCHRONOUS DATA QUERIES

// fetching data from the backend asynchronously and storing it in the atom
export const allNotificationsAtom = atom({
  key: "asyncAllNotificationsAtom",
  default: selector({
    key: "asyncBackend",
    get: async () => {
      console.log("allNotificationsAtom");
      // to make the below logic sleep for 5 sec
      await new Promise((r) => setTimeout(r, 5000));
      const res = await axios.get("http://localhost:5000/notifications");
      console.log(res.data);
      return res.data;
    },
  }),
});

export const totalCountSelector = selector({
  key: "asyncTotalCountSelector",
  get: ({ get }) => {
    const allNotificationsAtom = get(allNotificationsAtom);
    const network = allNotificationsAtom.network;
    const jobs = allNotificationsAtom.jobs;
    const notifications = allNotificationsAtom.notifications;
    const messaging = allNotificationsAtom.messaging;

    return network + jobs + notifications + messaging;
  },
});
