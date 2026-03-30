import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutList } from 'lucide-react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const API_URL = 'http://localhost:5000/api/tasks';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
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

  return (
    <div className="w-full max-w-2xl px-4 mx-auto animate-fade-in">
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 md:p-8 rounded-3xl shadow-2xl">
        <header className="flex items-center gap-4 mb-8">
          <div className="bg-indigo-500/10 p-3 rounded-2xl text-indigo-400">
            <LayoutList size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Task Manager
            </h1>
            <p className="text-slate-400 mt-1">Stay organized, stay productive</p>
          </div>
        </header>

        <TaskForm onAdd={handleAdd} />
        
        {isLoading ? (
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
  );
}
