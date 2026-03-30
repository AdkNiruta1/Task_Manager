import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutList, LogOut } from 'lucide-react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const API_URL = 'http://localhost:5000/api/tasks';

export default function Dashboard() {
  const { user, loading, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [isTasksLoading, setIsTasksLoading] = useState(true);

  useEffect(() => {
    // Only fetch if user is defined
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsTasksLoading(false);
    }
  };

  const handleAdd = async (title) => {
    try {
      const response = await axios.post(API_URL, { title });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      setTasks(tasks.map(task => task._id === id ? { ...task, completed } : task));
      await axios.put(`${API_URL}/${id}`, { completed });
    } catch (error) {
      console.error('Error updating task:', error);
      fetchTasks();
    }
  };

  const handleDelete = async (id) => {
    try {
      setTasks(tasks.filter(task => task._id !== id));
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting task:', error);
      fetchTasks();
    }
  };

  // Protected Route Logic
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="w-full max-w-6xl px-4 mx-auto animate-fade-in mt-4">
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 md:p-10 rounded-3xl shadow-2xl min-h-[75vh]">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-500/10 p-3 rounded-2xl text-indigo-400">
              <LayoutList size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                My Dashboard
              </h1>
              <p className="text-slate-400 mt-1">Welcome back, {user.name}!</p>
            </div>
          </div>
          
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-slate-700 border-transparent hover:border-red-500/50 rounded-xl transition-all"
          >
            <LogOut size={18} /> Logout
          </button>
        </header>

        <div className="max-w-3xl mx-auto">
          <TaskForm onAdd={handleAdd} />
          
          {isTasksLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 rounded-full border-4 border-slate-700 border-t-indigo-500 animate-spin" />
            </div>
          ) : (
            <TaskList 
              tasks={tasks} 
              onToggleComplete={handleToggleComplete} 
              onDelete={handleDelete} 
            />
          )}
        </div>
      </div>
    </div>
  );
}
