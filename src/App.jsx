import { useState, useEffect } from "react";
import { supabase } from './utils/supabaseClient';
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import AuthForm from "./components/AuthForm";
import Alert from './components/Alert';

const App = () => {
  const [session, setSession] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchTasks();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchTasks();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) console.error('Error fetching tasks:', error);
    else setTasks(data);
    setIsLoading(false);
  };

  const addTask = async (name) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ name, completed: false, user_id: session.user.id }])
        .select();

      if (error) {
        console.error('Error:', error);
        setAlert({ message: `Error: ${error.message}`, type: 'error' });
      } else {
        setTasks([...tasks, data[0]]);
        setAlert({ message: 'Task added successfully!', type: 'success' });
      }
    } catch (error) {
      console.error('Error adding task:', error);
      setAlert({ message: 'Failed to add task. Please try again.', type: 'error' });
    }
  };

  const removeTask = async (id) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .match({ id });

      if (error) {
        console.error('Error:', error);
        setAlert({ message: `Error: ${error.message}`, type: 'error' });
      } else {
        setTasks(tasks.filter(task => task.id !== id));
      }
    } catch (error) {
      console.error('Error removing task:', error);
      setAlert({ message: 'Failed to remove task. Please try again.', type: 'error' });
    }
  };

  const toggleComplete = async (id) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      const { error } = await supabase
        .from('tasks')
        .update({ completed: !taskToUpdate.completed })
        .match({ id });

      if (error) {
        console.error('Error:', error);
        setAlert({ message: `Error: ${error.message}`, type: 'error' });
      } else {
        setTasks(tasks.map(task =>
          task.id === id ? { ...task, completed: !task.completed } : task
        ));
      }
    } catch (error) {
      console.error('Error updating task:', error);
      setAlert({ message: 'Failed to update task. Please try again.', type: 'error' });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setTasks([]);
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
        {!session ? (
          <AuthForm onAuth={setSession} setAlert={setAlert} />
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-blue-800">Task Management App</h1>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Log Out
              </button>
            </div>
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
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
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
