/*const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Serve main HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running!',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('✅ Server started successfully!');
});*/
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files from current directory

// Demo auth endpoints
app.post('/api/auth/register', (req, res) => {
    console.log('Register attempt:', req.body);
    res.json({ 
        success: true, 
        message: 'Registration successful (demo)' 
    });
});

app.post('/api/auth/login', (req, res) => {
    console.log('Login attempt:', req.body);
    const { userType } = req.body;
    
    res.json({ 
        success: true, 
        message: `Login successful as ${userType}`,
        token: 'demo-token-123',
        user: {
            id: 1,
            fullname: 'Demo User',
            email: 'demo@example.com',
            aadhaar: '001122334455',
            user_type: userType
        }
    });
});

// Serve frontend - FIXED: Serve from current directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve other HTML pages if they exist
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Server is running!',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log('✅ Server started successfully!');
    console.log('📱 Access your app at: http://localhost:3001');
});
