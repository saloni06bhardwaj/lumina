// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ Health check route (IMPORTANT for deployment)
app.get('/', (req, res) => {
    res.send('API is running 🚀');
});

// Routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/project');
const taskRoutes = require('./routes/task');

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// ✅ PORT (Railway uses this)
const PORT = process.env.PORT || 5000;

// ✅ Start server FIRST (important for Railway)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// ✅ Connect to MongoDB (after server starts)
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});

// ✅ Global error handlers (prevents crashes)
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});