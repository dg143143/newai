const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    // Use in-memory MongoDB for demo (you can replace with real MongoDB URL)
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/smartsignal';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
    
    // Create default admin user if it doesn't exist
    await createDefaultAdmin();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // For demo purposes, we'll continue without MongoDB
    console.log('Continuing without MongoDB - using in-memory storage');
  }
};

// Create default admin user
const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ username: 'admin' });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      const admin = new User({
        username: 'admin',
        password: hashedPassword,
        role: 'admin',
        status: 'approved'
      });
      
      await admin.save();
      console.log('Default admin user created: admin/admin123');
    }
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'SmartSignal Pro v2 Backend is running!', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`SmartSignal Pro v2 Backend running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
};

startServer();