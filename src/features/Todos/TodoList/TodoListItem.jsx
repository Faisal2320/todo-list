import TextInputWithLabel from "../../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../../utils/todoValidation";
import useEditableTitle from "../../../hooks/useEditableTitle";
import sanitizeInput from "../../../utils/sanitizeInput";

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
    const sanitizedTitle = sanitizeInput(newTitle);
    onUpdateTodo({ ...task, title: sanitizedTitle });
  }

  return (
    <li
      className="
        flex items-center justify-between
        bg-white border border-gray-200 rounded-md
        px-4 py-3 shadow-sm
        hover:shadow-md transition
      "
    >
      {isEditing ? (
        <>
          <form
            onSubmit={handleUpdate}
            className="flex items-center gap-2 flex-1"
          >
            <TextInputWithLabel
              maxLength={25}
              value={workingTitle}
              onChange={(e) => updateTitle(e.target.value)}
            />
            <button
              type="button"
              onClick={cancelEditing}
              className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              type="button"
              disabled={!isValidTodoTitle(workingTitle)}
              className="
              px-3 py-2 rounded bg-blue-600 text-white
              disabled:opacity-40 disabled:cursor-not-allowed
            "
            >
              Update
            </button>
          </form>
        </>
      ) : (
        <label className="flex items-center gap-3 flex-1 cursor-pointer">
          <input
            type="checkbox"
            id={`checkbox${task.id}`}
            checked={task.isCompleted}
            onChange={() => onCompleteTodo(task.id)}
            className="special-check"
          />

          <span
            onClick={startEditing}
            className={`
              flex-1
              ${task.isCompleted ? "line-through text-teal-500" : "text-gray-800"}
              hover:text-primary transition
            `}
          >
            {task.title}
          </span>
        </label>
      )}
    </li>
  );
}
