import { useState, useEffect } from "react";
import { supabase } from './utils/supabaseClient';
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import Alert from './components/Alert';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) throw error;
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setAlert({ message: `Failed to fetch tasks: ${error.message}`, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (name) => {
    console.log("Adding task:", name);
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ name, completed: false }])
        .select();

      if (error) throw error;

      console.log("Supabase response:", data);
      setTasks([...tasks, data[0]]);
      setAlert({ message: 'Task added successfully!', type: 'success' });
    } catch (error) {
      console.error('Error adding task:', error);
      setAlert({ message: `Failed to add task: ${error.message}`, type: 'error' });
    }
  };

  const removeTask = async (id) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .match({ id });

      if (error) throw error;

      setTasks(tasks.filter(task => task.id !== id));
      setAlert({ message: 'Task removed successfully!', type: 'success' });
    } catch (error) {
      console.error('Error removing task:', error);
      setAlert({ message: `Failed to remove task: ${error.message}`, type: 'error' });
    }
  };

  const toggleComplete = async (id) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      const { error } = await supabase
        .from('tasks')
        .update({ completed: !taskToUpdate.completed })
        .match({ id });

      if (error) throw error;

      setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ));
      setAlert({ message: 'Task updated successfully!', type: 'success' });
    } catch (error) {
      console.error('Error updating task:', error);
      setAlert({ message: `Failed to update task: ${error.message}`, type: 'error' });
    }
  };

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8">Task Management App</h1>
          {alert && <Alert message={alert.message} type={alert.type} />}
          <TaskForm onSubmit={addTask} />
          {isLoading ? (
            <p className="text-center">Loading tasks...</p>
          ) : (
            <TaskList
              tasks={tasks}
              onRemove={removeTask}
              onToggleComplete={toggleComplete}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
