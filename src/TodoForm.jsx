export default function TodoForm() {
  return (
    <form>
      <label htmlFor="todo">New Todo:</label>
      <input id="todo" type="text" placeholder="Enter todo item" />
      <button type="submit">Add Todo</button>
    </form>
  );
}
