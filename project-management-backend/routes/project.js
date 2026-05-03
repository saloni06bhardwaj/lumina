
const express = require('express');
const Project = require('../models/Project'); 
const { verifyToken, isAdmin } = require('../middleware/authMiddleware'); 

const router = express.Router();

router.post('/', verifyToken, isAdmin, async (req, res) => {
    try {
        const { name, description } = req.body;

        const newProject = new Project({
            name,
            description,
            createdBy: req.user.id 
        });

        await newProject.save();
        res.status(201).json({ message: 'Project successfully created', project: newProject });

    } catch (error) {
        res.status(500).json({ error: 'Server error', detail: error.message });
    }
});

router.get('/', verifyToken, async (req, res) => {
    try {
       
        const projects = await Project.find().populate('createdBy', 'name email');
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Server error', detail: error.message });
    }
});

router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error', detail: error.message });
    }
});

module.exports = router;