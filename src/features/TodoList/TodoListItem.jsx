import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../utils/todoValidation";
import useEditableTitle from "../../hooks/useEditableTitle";

export default function TodoListItem({ onCompleteTodo, onUpdateTodo, task }) {
  const {
    isEditing,
    workingTitle,
    startEditing,
    cancelEditing,
    updateTitle,
    finishEditing,
  } = useEditableTitle(task.title);

  function handleUpdate(event) {
    if (!isEditing) {
      return;
    }
    event.preventDefault();
    const newTitle = finishEditing();
    onUpdateTodo({ ...task, title: newTitle });
  }

  return (
    <li>
      {isEditing ? (
        <>
          <form onSubmit={handleUpdate}>
            <TextInputWithLabel
              value={workingTitle}
              onChange={(e) => updateTitle(e.target.value)}
            />
            <button type="button" onClick={cancelEditing}>
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              type="button"
              disabled={!isValidTodoTitle(workingTitle)}
            >
              Update
            </button>
          </form>
        </>
      ) : (
        <label>
          <input
            type="checkbox"
            id={`checkbox${task.id}`}
            checked={task.isCompleted}
            onChange={() => onCompleteTodo(task.id)}
          />

          <span onClick={startEditing}>{task.title}</span>
        </label>
      )}
    </li>
  );
}
