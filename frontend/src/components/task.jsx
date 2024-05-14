import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../reducers/taskSlice';
import './task.css';

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const [editedTaskName, setEditedTaskName] = useState(task.name);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
  };

  const handleUpdate = () => {
    dispatch(updateTask({ taskId: task._id, taskData: { name: editedTaskName } }));
    setIsEditing(false);
  };

  return (
    <div className="task">
      {isEditing ? (
        <>
          <input
            type="text"
            className="task-name"
            value={editedTaskName}
            onChange={(e) => setEditedTaskName(e.target.value)}
          />
          <button className="task-save" onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <span className="task-text">{task.name}</span>
          <button className="task-edit" onClick={() => setIsEditing(true)}>Edit</button>
          <button className="task-delete" onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Task;
