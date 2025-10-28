const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5055;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app build directory
const frontendBuildPath = path.join(__dirname, '../frontend/build');
if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Data directory path
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize users.json file if it doesn't exist
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

// POST /api/users - Save new user data to users.json array
app.post('/api/users', (req, res) => {
  try {
    const userData = req.body;
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'workingLocation', 'nic', 'dob', 'province', 'address', 'startDate', 'retiringDate', 'position', 'designation', 'department', 'experience'];
    const missingFields = requiredFields.filter(field => !userData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: 'Missing required fields',
        missingFields: missingFields
      });
    }

    // Read existing users
    let users = [];
    if (fs.existsSync(USERS_FILE)) {
      const fileContent = fs.readFileSync(USERS_FILE, 'utf8');
      users = JSON.parse(fileContent);
    }

    // Check if user with same email already exists
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
      return res.status(400).json({
        message: 'User with this email already exists',
        email: userData.email
      });
    }

    // Add metadata and create user record
    const userRecord = {
      id: Date.now().toString(), // Simple ID generation
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add new user to array
    users.push(userRecord);

    // Save updated users array to file
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

    res.status(201).json({
      message: 'User data saved successfully',
      userId: userRecord.id,
      totalUsers: users.length,
      data: userRecord
    });

  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).json({
      message: 'Error saving user data',
      error: error.message
    });
  }
});

// GET /api/users - Retrieve all users from users.json array
app.get('/api/users', (req, res) => {
  try {
    let users = [];
    
    if (fs.existsSync(USERS_FILE)) {
      const fileContent = fs.readFileSync(USERS_FILE, 'utf8');
      users = JSON.parse(fileContent);
    }

    res.json({
      message: 'Users retrieved successfully',
      count: users.length,
      users: users
    });

  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({
      message: 'Error retrieving users',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Catch-all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
  const indexPath = path.join(frontendBuildPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({
      message: 'Frontend build not found. Please run npm run build in the frontend directory',
      path: req.originalUrl
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}`);
});

module.exports = app;
