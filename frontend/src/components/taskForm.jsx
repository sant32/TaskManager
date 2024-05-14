import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../reducers/taskSlice';
import './taskForm.css'

const TaskForm = () => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      dispatch(addTask(taskName));
      setTaskName('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        placeholder="Add task..."
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button type="submit" className="task-submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
