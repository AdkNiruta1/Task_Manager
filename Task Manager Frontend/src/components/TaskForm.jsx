import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="What needs to be done?"
        className="flex-1 bg-slate-800 border-2 border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors text-slate-100 placeholder-slate-400"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button 
        type="submit" 
        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-4 py-3 font-medium transition-all duration-200 active:scale-95 flex items-center gap-2"
      >
        <Plus size={20} />
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
