const jwt = require('jsonwebtoken');
const User = require('../models/User');

// This middleware authenticates the user via JWT
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token. User not found.' });
    }

    req.user = user;
    next();
  } catch (error) {
    // Catches JWT verification errors (e.g., expired, malformed)
    res.status(401).json({ message: 'Invalid token.' });
  }
};

// This middleware checks if the authenticated user is an admin
const isAdmin = (req, res, next) => {
  // Assumes 'auth' middleware has been called before this
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
};

module.exports = { auth, isAdmin };