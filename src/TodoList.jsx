export default function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((task) => {
        return (
          <li key={task.id}>
            {task.id} - {task.title}
          </li>
        );
      })}
    </ul>
  );
}
