
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ error: 'Access Denied: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; 
        next(); 
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};


const isAdmin = (req, res, next) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Access Denied: Admin privileges required' });
    }
    next(); 
};

module.exports = { verifyToken, isAdmin };