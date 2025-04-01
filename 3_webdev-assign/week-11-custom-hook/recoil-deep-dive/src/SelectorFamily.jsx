import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { todosAtomFamilySelector } from "./selectorsFamily"; // for fetching data from the backend

export function TodoSelectorFamily() {
  return (
    <div>
      <Todo id={1} />
      <Todo id={2} />
    </div>
  );
}

// Todo component
function Todo({ id }) {
  // will fetch data from the backend
  //   const currentTodo = useRecoilValue(todosAtomFamilySelector(id));

  // for using loadable
  const currentTodo = useRecoilValueLoadable(todosAtomFamilySelector(id));
  console.log(currentTodo); // to know what are the fields it contains

  //   now this currentTodo is an object which also has fields like state and contents
  //   state has value like : loading, hasValue, hasError etc.
  if (currentTodo.state === "loading") {
    return <div>loading...</div>;
  } else if (currentTodo.state === "hasValue") {
    return (
      <div>
        Title: {currentTodo.contents.title} <br />
        Description: {currentTodo.contents.description}
        <br />
        <br />
      </div>
    );
  } else if (currentTodo.state === "hasError") {
    return <div>Error in backend.</div>;
  }
}
