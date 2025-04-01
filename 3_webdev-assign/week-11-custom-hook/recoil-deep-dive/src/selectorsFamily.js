import { atomFamily, selectorFamily } from "recoil";
import axios from "axios";

// returns an atom for the given id
export const todosAtomFamilySelector = atomFamily({
  key: "selector-atomFamily",
  default: selectorFamily({
    key: "selectorFamily",
    get:
      (id) =>
      async ({ get }) => {
        // delaying for using lodable : waiting for 5 sec
        await new Promise((r) => setTimeout(r, 5000));
        // http://localhost:5000/todos?id=1
        const res = await axios.get(`http://localhost:5000/todos?id=${id}`);
        return res.data.todo;
      },
  }),
});

// or diff syntax for better understanding

// export const todosAtomFamily2 = atomFamily({
//   key: "selector-atomFamily-2",
//   default: selectorFamily({
//     key: "selectorFamily-2",
//     get: function (id) {
//       return async function ({ get }) {
//         const res = await axios.get(`http://localhost:5000/todos?id=${id}`);
//         return res.data.todo;
//       };
//     },
//   }),
// });
