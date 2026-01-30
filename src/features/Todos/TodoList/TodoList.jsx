import { useMemo } from "react";
import TodoListItem from "./TodoListItem";

// TodoList component to display list of todos
export default function TodoList({
  dataVersion,
  onCompleteTodo,
  onUpdateTodo,
  todos,
}) {
  const filteredTodoList = useMemo(() => {
    // console.log("Recalculating filtered Todos (v", dataVersion, ")");
    return {
      version: dataVersion,

      todos: todos.filter((todo) => !todo.isCompleted),
    };
  }, [dataVersion, todos]);

  return (
    <>
      {filteredTodoList.length === 0 ? (
        <p>Add todos above to get started</p>
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
