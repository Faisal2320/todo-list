function App() {
  const todos = [
    { id: 1, title: "Open the Office" },
    { id: 2, title: "Open the main gate" },
    { id: 3, title: "Take out the gulf cart" },
    { id: 4, title: "Clean the office" },
    { id: 5, title: "Check all units" },
    { id: 6, title: "Reconcile the system" },
    { id: 7, title: "...Other tasks" },
  ];

  return (
    <div className="">
      <h1>My todos</h1>
      <ul>
        {todos.map((task) => {
          return (
            <li key={task.id}>
              {task.id} - {task.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
