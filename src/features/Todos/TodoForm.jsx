import { useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../utils/todoValidation";
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
      <TextInputWithLabel
        elementId="todo"
        labelText="New Todo:"
        type="text"
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        placeholder="Enter todo item"
      />
      <button disabled={!isValidTodoTitle(workingTodoTitle)} type="submit">
        Add Todo
      </button>
    </form>
  );
}
