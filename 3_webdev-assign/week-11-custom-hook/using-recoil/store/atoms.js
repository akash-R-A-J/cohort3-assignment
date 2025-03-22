import { atom, selector } from "recoil";

// for atoms
export const counterAtom = atom({
  key: "counter", // unique ID (with respect to other atoms/selectors)
  default: 0,
});

// using selectors (geenerally do it in a separate folder/file)
// don't have their own variable, it is derived from others (from atoms)
export const evenSelector = selector({
  key: "evenSelector",
  // getter
  get: ({ get }) => {
    // here we can derive state from any atoms
    const currCount = get(counterAtom);
    const isEven = currCount % 2 == 0;
    return isEven;
  },
});
