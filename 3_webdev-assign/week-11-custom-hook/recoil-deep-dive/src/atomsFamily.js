import { atomFamily } from "recoil";
import { TODOS } from "./todos";

// defining an atom-family
export const todosAtomFamily = atomFamily({
  key: "todosAtomFamily",
  // the default value here is a function not a value
  default: (id) => {
    // mapping/filter function to find todo given an id from TODOS
    // using hard-coded TODOS for now
    return TODOS.find((x) => x.id === id);
  },
});
