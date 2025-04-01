import { atom, selector } from "recoil";

// hard-coded values

export const networkAtom = atom({
  key: "network",
  default: 104,
});

export const jobsAtom = atom({
  key: "jobs",
  default: 0,
});

export const notificationsAtom = atom({
  key: "notifications",
  default: 12,
});

export const messagingAtom = atom({
  key: "messaging",
  default: 0,
});

// selector deriving totalCount state from above 4 atoms
export const totalCountSelector = selector({
  key: "totalCount",
  get: ({ get }) => {
    const networkCount = get(networkAtom);
    const jobsCount = get(jobsAtom);
    const notificationsCount = get(notificationsAtom);
    const messagingCount = get(messagingAtom);

    return networkCount + jobsCount + notificationsCount + messagingCount;
  },
});

// getting values from the server/backend - unoptimal way

export const allNotificationsAtom = atom({
  key: "allNotificationsAtom",
  default: {
    network: 0,
    jobs: 0,
    notifications: 0,
    messaging: 0,
  },
});

export const allNotificationsSelector = selector({
  key: "allNotificationsSelector",
  get: ({ get }) => {
    const allNotifications = get(allNotificationsAtom);

    // Handle initial empty object by providing defaults
    const network = allNotifications.network;
    const jobs = allNotifications.jobs;
    const notifications = allNotifications.notifications;
    const messaging = allNotifications.messaging;

    return network + jobs + notifications + messaging;
  },
});
