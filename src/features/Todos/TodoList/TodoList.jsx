import { useMemo } from "react";
import TodoListItem from "./TodoListItem";

// TodoList component to display list of todos
export default function TodoList({
  statusFilter = "active",
  dataVersion,
  onCompleteTodo,
  onUpdateTodo,
  todos,
}) {
  const filteredTodoList = useMemo(() => {
    let filterTodos;
    switch (statusFilter) {
      case "completed":
        filterTodos = todos.filter((todo) => todo.isCompleted);
        break;
      case "active":
        filterTodos = todos.filter((todo) => !todo.isCompleted);
        break;
      case "all":
      default:
        filterTodos = todos;
        break;
    }

    return {
      version: dataVersion,
      todos: filterTodos,
    };
  }, [dataVersion, todos, statusFilter]);

  const getEmptyMessage = () => {
    switch (statusFilter) {
      case "completed":
        return "No completed todos yet. Complete some tasks to see them here.";
      case "active":
        return "No active todos. Add a todo above to get started.";
      case "all":
      default:
        return "add todo above to get started";
    }
  };

  return (
    <>
      {filteredTodoList.length === 0 ? (
        <p>{getEmptyMessage()}</p>
      ) : (
        <ul>
          {filteredTodoList.todos.map((task) => {
            return (
              <TodoListItem
                task={task}
                onCompleteTodo={onCompleteTodo}
                onUpdateTodo={onUpdateTodo}
                key={task.id}
              />
            );
          })}
        </ul>
      )}
    </>
  );
}
