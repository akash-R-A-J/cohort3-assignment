import { atomFamily, selectorFamily } from "recoil";
import imageSrc from "./assets/react.svg";

const info = {
  name: "Akash Raj",
  imageSrc,
  role: "Software Engineer",
  company: "Solana Labs",
  address: "San Francisco, CA",
  description:
    "Passionate about Solana ecosystem, smart contracts and protocols.",
};

export const profileInfo = atomFamily({
  key: "profileInfo",
  default: selectorFamily({
    key: "profileSelector",
    get: ( key ) => () => info[key] || null,
  }),
});
