import {  useState } from "react";
export default function TodoForm({ funcAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  function handleOnSubmit(event) {
    event.preventDefault();

    if (workingTodoTitle.trim()) {
      funcAddTodo(workingTodoTitle.trim());
        setWorkingTodoTitle("");
    }
  }
  return (
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="todo">New Todo:</label>
      <input
        id="todo"
        type="text"
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        placeholder="Enter todo item"
      />
      <button disabled={!workingTodoTitle.trim()} type="submit">Add Todo</button>
    </form>
  );
}
