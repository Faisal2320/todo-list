import { useRef } from "react";
export default function TodoForm({ funcAddTodo }) {
  const inputRef = useRef();
  function handleOnSubmit(event) {
    event.preventDefault();

    const inputValue = event.target.todo.value.trim();
    if (inputValue) {
      funcAddTodo({ id: Date.now(), title: inputValue });
      event.target.reset();
      inputRef.focus();
    }
  }
  return (
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="todo">New Todo:</label>
      <input
        ref={inputRef}
        id="todo"
        type="text"
        onChange={(e) => (inputRef.current.value = e.target.value)}
        placeholder="Enter todo item"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}
