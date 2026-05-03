// impoprting required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
// env loading
dotenv.config();
// middlewares
const app = express();
app.use(cors());
app.use(express.json());

const authroutes = require('./routes/auth');
const projectRoutes = require('./routes/project');


app.use('/api/auth', authroutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', require('./routes/task'));


// connecting mongodb
mongoose.connect(process.env.MONGO_URI,).then(()=>{
    console.log('Connected to MongoDB');
    // starting the server only when db is connected 
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error)=>{
    console.error('Error connecting to MongoDB:', error);
});