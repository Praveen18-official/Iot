require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
console.log('Connecting to MongoDB...');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB Connected!');
        console.log('Database:', mongoose.connection.name);
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });

const db = mongoose.connection;

// Event listeners
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log('MongoDB connection is open');
    console.log('Ready to accept connections!');
});

// Clear any existing models to prevent OverwriteModelError
if (mongoose.models.User) {
    mongoose.deleteModel('User');
}
if (mongoose.models.Contact) {
    mongoose.deleteModel('Contact');
}

// Define User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Define Contact Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Define Detection Schema
const detectionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    imageUrl: { type: String, required: true },
    disease: { type: String, required: true },
    confidence: { type: Number, required: true },
    location: String,
    notes: String,
    timestamp: { type: Date, default: Date.now }
});

// Create models with explicit collection names
const User = mongoose.model('User', userSchema, 'users');
const Contact = mongoose.model('Contact', contactSchema, 'contacts');
const Detection = mongoose.model('Detection', detectionSchema, 'detections');

console.log('Database models initialized');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Routes

// Register a new user
app.post('/api/register', async (req, res) => {
    try {
        console.log('Register request received:', req.body);
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            console.log('Missing required fields');
            return res.status(400).json({ 
                success: false,
                message: 'Please provide all required fields' 
            });
        }
        
        // Check if user already exists
        console.log('Checking for existing user...');
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists:', email);
            return res.status(400).json({ 
                success: false,
                message: 'User already exists' 
            });
        }

        // Hash password
        console.log('Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        console.log('Creating new user...');
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        console.log('Saving user to database...');
        await user.save();
        console.log('User saved successfully:', user);
        
        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1h' }
        );

        res.status(201).json({ 
            success: true,
            token, 
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email 
            } 
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error',
            error: error.message 
        });
    }
});

// User login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
    try {
        console.log('Contact form submission received:', req.body);
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            console.log('Missing required fields');
            return res.status(400).json({ 
                success: false,
                message: 'Please provide all required fields' 
            });
        }

        console.log('Creating new contact...');
        const contact = new Contact({
            name,
            email,
            message
        });

        console.log('Saving contact to database...');
        await contact.save();
        console.log('Contact saved successfully:', contact);
        
        res.status(201).json({ 
            success: true,
            message: 'Message sent successfully',
            data: contact 
        });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error',
            error: error.message 
        });
    }
});

// Get all contacts (protected route)
app.get('/api/contacts', authenticateToken, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        console.error('Get contacts error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all detections for the current user (protected route)
app.get('/api/detections', authenticateToken, async (req, res) => {
    try {
        const detections = await Detection.find({ userId: req.user.id }).sort({ timestamp: -1 });
        res.json(detections);
    } catch (error) {
        console.error('Get detections error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new detection (protected route)
app.post('/api/detections', authenticateToken, async (req, res) => {
    try {
        const { imageUrl, disease, confidence, location, notes } = req.body;
        
        const detection = new Detection({
            userId: req.user.id,
            imageUrl,
            disease,
            confidence,
            location,
            notes,
            timestamp: new Date()
        });

        await detection.save();
        res.status(201).json(detection);
    } catch (error) {
        console.error('Create detection error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});
