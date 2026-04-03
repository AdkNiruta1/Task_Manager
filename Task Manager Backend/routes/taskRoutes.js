const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

// GET /tasks: get all tasks for logged in user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /tasks: add a task
router.post('/', auth, async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = new Task({ title, user: req.user.id });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /tasks/:id: update task 
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    // Ensure users can only update THEIR OWN tasks
    const task = await Task.findOne({ _id: id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });

    task.completed = completed;
    await task.save();
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /tasks/:id: delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Ensure users can only delete THEIR OWN tasks
    const task = await Task.findOneAndDelete({ _id: id, user: req.user.id });

    if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
