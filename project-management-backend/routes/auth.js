const express = require('express');
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
const User = require( '../models/User' );
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// signup route new user
router.post('/signup', async(req,res) => {
    try{
        const{ name, email, password, role } = req.body;

        console.log("Signup data received:", { name, email, role });
        // checki if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // hash the password
        const salt =await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        // new user in db
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'MEMBER'
        });
        await newUser.save();
        console.log("User created:", { id: newUser._id, name: newUser.name, role: newUser.role });
        res.status(201).json({message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', detail: error.message });
    }
});

// login route
router.post('/login', async(req,res) => {
    try{
        const{email, password} = req.body;
        // check if user exists
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // generate token
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
                process.env.JWT_SECRET, 
                { expiresIn: '1d' }
            );
        res.status(200).json({ 
            message: 'Login successful',
            token:token,
            user:{id:user._id,name:user.name,role:user.role}
         });
    } catch (error) {
        res.status(500).json({ message: 'Server error', detail: error.message });
    }
});

// get all users (for admin to assign tasks)
router.get('/users', verifyToken, isAdmin, async(req,res) => {
    try{
        const users = await User.find();
        console.log('All users from DB:', users.map(u => ({ id: u._id, name: u.name, email: u.email, role: u.role })));
        const usersWithoutPassword = users.map(u => ({
            _id: u._id,
            name: u.name,
            email: u.email,
            role: u.role,
            createdAt: u.createdAt,
            updatedAt: u.updatedAt
        }));
        res.status(200).json(usersWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: 'Server error', detail: error.message });
    }
});

module.exports = router;