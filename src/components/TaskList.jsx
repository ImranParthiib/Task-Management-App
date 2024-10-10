// src/components/TaskList.jsx
import React from "react";

const TaskList = ({ tasks, onRemove, onToggleComplete }) => {
  return (
    <ul className="list-disc pl-5">
      {tasks.map((task, index) => (
        <li
          key={index}
          className="py-1 text-gray-800 border-b border-gray-300 flex justify-between items-center"
        >
          <span
            className={`flex-1 ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
            onClick={() => onToggleComplete(index)}
          >
            {task.name}
          </span>
          <button
            className="ml-4 text-red-500 hover:text-red-700"
            onClick={() => onRemove(index)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
