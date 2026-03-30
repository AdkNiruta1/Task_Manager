import React, { useState } from 'react';
import { Trash2, Check, X } from 'lucide-react';

const TaskItem = ({ task, onToggleComplete, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(task._id), 200);
  };

  return (
    <div 
      className={`group flex items-center justify-between p-4 mb-3 rounded-2xl border-2 transition-all duration-300 ${
        task.completed 
          ? 'bg-slate-800/50 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)] text-slate-400' 
          : 'bg-slate-800 border-slate-700 shadow-lg hover:border-indigo-500/50 hover:shadow-indigo-500/10'
      } ${isDeleting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
    >
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => onToggleComplete(task._id, !task.completed)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            task.completed 
              ? 'bg-emerald-500 border-emerald-500 text-white' 
              : 'border-slate-500 hover:border-indigo-400 text-transparent'
          }`}
        >
          <Check size={14} strokeWidth={3} className={task.completed ? 'scale-100' : 'scale-0'} />
        </button>
        
        <span className={`text-lg transition-all duration-300 ${task.completed ? 'line-through decoration-emerald-500/50' : ''}`}>
          {task.title}
        </span>
      </div>

      <button
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 rounded-xl transition-all duration-200"
        title="Delete task"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default TaskItem;
