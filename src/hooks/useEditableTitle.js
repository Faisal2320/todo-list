import { useState } from "react";

const useEditableTitle = (initialTitle) => {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(initialTitle);

  const startEditing = () => {
    setWorkingTitle(initialTitle);
    setIsEditing(true);
  };
  const cancelEditing = () => {
    setWorkingTitle(initialTitle);
    setIsEditing(false);
  };
  const updateTitle = (newTitle) => {
    setWorkingTitle(newTitle);
  };
  const finishEditing = () => {
    setIsEditing(false);
    return workingTitle;
  };

  return {
    isEditing,
    workingTitle,
    startEditing,
    cancelEditing,
    updateTitle,
    finishEditing,
  };
};

export default useEditableTitle;
