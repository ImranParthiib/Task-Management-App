import React from "react";
import PropTypes from 'prop-types';

const TaskList = ({ tasks, onRemove, onToggleComplete }) => {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks yet. Add a task to get started!</p>;
  }

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center bg-gray-100 p-4 rounded-md">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="mr-4 h-5 w-5 text-blue-500 focus:ring-blue-400"
          />
          <span className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.name}
          </span>
          <button
            onClick={() => onRemove(task.id)}
            className="ml-4 text-red-500 hover:text-red-600 focus:outline-none"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default TaskList;
