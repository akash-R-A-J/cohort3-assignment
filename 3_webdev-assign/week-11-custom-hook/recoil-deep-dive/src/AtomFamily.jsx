import { useRecoilValue } from "recoil";
import { todosAtomFamily } from "./atomsFamily"; // for hard-coded data

export function TodoAtomFamily() {
  return (
    <div>
      <Todo id={1} />
      <Todo id={2} />
    </div>
  );
}

function Todo({ id }) {
  // using atom-family to get todo from the respective atom
  console.log("todo-component");
  const currentTodo = useRecoilValue(todosAtomFamily(id)); // for hard-coded todos

  return (
    <div>
      Title: {currentTodo.title} <br />
      Description: {currentTodo.description}
      <br />
      <br />
    </div>
  );
}
