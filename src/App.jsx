// src/App.jsx
import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, { name: newTask, completed: false }]);
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleComplete = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Task Management App</h1>
      <TaskForm onSubmit={addTask} />
      <TaskList
        tasks={tasks}
        onRemove={removeTask}
        onToggleComplete={toggleComplete}
      />
    </div>
  );
};

export default App;
