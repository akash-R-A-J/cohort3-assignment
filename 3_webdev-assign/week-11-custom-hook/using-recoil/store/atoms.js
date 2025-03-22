import { atom } from "recoil";

export const counterAtom = atom({
  key: "counter", // unique ID (with respect to other atoms/selectors)
  default: 0,
});
