const Task = require('../models/task.model')
const mongoose = require('mongoose')

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ is_completed: false }).sort({ createdAt: -1 })
        const completedTasks = await Task.find({ is_completed: true}).sort({ createdAt: -1 })
        res.render('index', { tasks, completedTasks, user: req.user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
  };

exports.createTask = async (req, res) => {
    try {
        const task = new Task({
            name: req.body.name,
            googleId: req.isAuthenticated() ? req.user.googleId : null,
            displayName: req.isAuthenticated() ? req.user.displayName : 'Guest'
        });
        await task.save();
        res.json({ task })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.editTask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Task ID' });
        }
        
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.googleId !== req.user.googleId) {
            return res.status(403).json({ message: 'You are not authorized to edit this task' });
        }

        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        res.json({ task: updatedTask })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (task.googleId !== req.user.googleId) {
            return res.status(403).json({ message: 'You are not authorized to delete this task' });
        }
        await Task.findByIdAndDelete(id)
        res.json({ message: 'Task deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};