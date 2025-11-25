const todos = [
  { id: 1, title: "Open the Office" },
  { id: 2, title: "Open the main gate" },
  { id: 3, title: "Take out the gulf cart" },
  { id: 4, title: "Clean the office" },
  { id: 5, title: "Check all units" },
  { id: 6, title: "Reconcile the system" },
  { id: 7, title: "...Other tasks" },
];
export default function TodoList() {
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
