import TodoListItem from "./TodoListItem";
export default function TodoList({onCompleteTodo, todos }) {
const filteredTodoList  = todos.filter((todo) =>{
  return !todo.isCompleted
});

  return (
    <>
    {
      filteredTodoList.length === 0
      ? <p>Add todos above to get started</p>
      :<ul>
      {filteredTodoList.map((task) => {
        return (
          <TodoListItem task={task} onCompleteTodo={onCompleteTodo} key={task.id}/>
          
        );
      })}
    </ul>
    }
    </>
  );
}
