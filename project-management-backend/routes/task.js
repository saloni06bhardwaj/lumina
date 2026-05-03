const express = require('express');
const Task = require('../models/Task');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// 1. CREATE TASK (Sirf Admin)
router.post('/', verifyToken, isAdmin, async (req, res) => {
    try {
        const { title, description, projectId, assignedTo, dueDate } = req.body;
        console.log('Creating task:', { title, projectId, assignedTo });
        const newTask = new Task({ title, description, projectId, assignedTo, dueDate });
        await newTask.save();
        console.log('Task created with ID:', newTask._id);
        res.status(201).json({ message: 'Task assigned successfully!', task: newTask });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. GET TASKS (Admin sab dekhega, Member sirf apne)
router.get('/', verifyToken, async (req, res) => {
    try {
        console.log('GET /tasks - User from token:', { id: req.user.id, role: req.user.role });
        let tasks;
        if (req.user.role === 'ADMIN') {
            tasks = await Task.find().populate('projectId').populate('assignedTo', 'name');
            console.log('Admin fetching all tasks:', tasks.length);
        } else {
            tasks = await Task.find({ assignedTo: req.user.id }).populate('projectId');
            console.log('Member fetching tasks for user:', req.user.id, 'Found:', tasks.length);
        }
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. UPDATE TASK STATUS (Member apna status change kar sakta hai)
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });

        // Check: Is this task assigned to this user? (Or is user Admin?)
        if (task.assignedTo.toString() !== req.user.id && req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Access Denied: You cannot update this task' });
        }

        task.status = req.body.status || task.status;
        await task.save();
        res.json({ message: 'Status updated successfully', task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;