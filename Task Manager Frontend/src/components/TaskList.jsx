import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleComplete, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center text-slate-500 py-10">
        No tasks yet. Add one above!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <TaskItem 
          key={task._id} 
          task={task} 
          onToggleComplete={onToggleComplete} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default TaskList;
