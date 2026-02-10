import { useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../utils/todoValidation";
import sanitizeInput from "../../utils/sanitizeInput";

export default function TodoForm({ funcAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  function handleOnSubmit(event) {
    event.preventDefault();

    if (workingTodoTitle.trim()) {
      funcAddTodo(sanitizeInput(workingTodoTitle.trim()));
      setWorkingTodoTitle("");
    }
  }

  return (
    <form onSubmit={handleOnSubmit} className="flex items-end gap-3 w-full">
      <div className="flex-1">
        <TextInputWithLabel
          elementId="todo"
          labelText="New Todo:"
          type="text"
          value={workingTodoTitle}
          onChange={(e) => setWorkingTodoTitle(e.target.value)}
          placeholder="Enter todo item"
        />
      </div>

      <button
        disabled={!isValidTodoTitle(workingTodoTitle)}
        type="submit"
        className="h-10.5 px-4 bg-blue-600 text-white rounded disabled:opacity-40"
      >
        Add Todo
      </button>
    </form>
  );
}
