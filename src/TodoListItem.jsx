
export default function TodoListItem ({onCompleteTodo, task}) {
    return (
          <li>
            <label htmlFor={task.id}>

      <input
      id={task.id}
      type="checkbox"
      checked={task.isCompleted}
      onChange={() => onCompleteTodo(task.id)}
      />
      
        
      {task.title}
      </label>
      
  </li>
          );
}