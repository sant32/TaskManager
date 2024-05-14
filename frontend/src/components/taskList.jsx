import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../reducers/taskSlice';
import Task from './task.jsx';
import "./taskList.css"

// TaskList component displays the list of tasks
const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const status = useSelector((state) => state.tasks.status);
  const error = useSelector((state) => state.tasks.error);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTasks()); 
  }, [dispatch, tasks.length]);

  if (status === 'loading') {
    return <div className="loading">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="error">Error: {error}</div>; 
  }

  if (!Array.isArray(tasks)) {
    return <div className="no-tasks">No tasks found.</div>; 
  }

  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <Task key={index} task={task} /> 
      ))}
    </div>
  );
};

export default TaskList;
