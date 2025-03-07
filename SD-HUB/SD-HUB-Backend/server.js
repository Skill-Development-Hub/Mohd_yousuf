import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createConnection } from 'mysql2';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import util from 'util';

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'your_secret_key';

// Enhanced CORS Configuration
app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));
app.use(bodyParser.json());

// Database connection
const db = createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'attendance_system'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Promisify Query for Async/Await
const query = util.promisify(db.query).bind(db);

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
};

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// User Registration
app.post('/api/users', async (req, res) => {
  const { name, email, password, role, department, position, isActive } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO users (name, email, password, role, department, position, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, role, department, position, isActive],
      (err, results) => {
        if (err) return res.status(500).json({ message: "Database error." });
        res.status(201).json({ message: "User created successfully." });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
});

// Fetch all users
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ message: "Database error." });
    res.json(results);
  });
});

// Fetch single user
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error." });
    if (results.length === 0) return res.status(404).json({ message: "User not found." });
    res.json(results[0]);
  });
});

// Enhanced Update User with Dynamic Partial Updates
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const fields = [];
  const values = [];

  // Build dynamic query
  Object.entries(updates).forEach(([key, value]) => {
    if (value !== undefined) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  });

  if (fields.length === 0) {
    return res.status(400).json({ message: "No valid fields to update." });
  }

  values.push(id);

  const queryStr = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;

  db.query(queryStr, values, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ 
        message: "Database operation failed",
        error: err.message
      });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({ 
      message: "User updated successfully.",
      updatedFields: fields.map(f => f.split(' ')[0])
    });
  });
});

// Delete User
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User deleted successfully' });
  });
});

// Check-in
app.post('/api/attendance/check-in', (req, res) => {
  const { userId } = req.body;
  db.query('INSERT INTO attendance (userId, date, checkInTime, status) VALUES (?, CURDATE(), NOW(), "present")', [userId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Check-in successful' });
  });
});

// Check-out
app.post('/api/attendance/check-out', (req, res) => {
  const { userId } = req.body;
  db.query('UPDATE attendance SET checkOutTime = NOW() WHERE userId = ? AND date = CURDATE()', [userId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Check-out successful' });
  });
});

// Fetch Attendance Records
app.get('/api/attendance', (req, res) => {
  db.query('SELECT * FROM attendance', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Fetch User Attendance
app.get('/api/attendance/user/:userId', (req, res) => {
  const { userId } = req.params;
  db.query('SELECT * FROM attendance WHERE userId = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Generate Attendance Report
app.get('/api/attendance/report', (req, res) => {
  const { startDate, endDate } = req.query;
  db.query('SELECT * FROM attendance WHERE date BETWEEN ? AND ?', [startDate, endDate], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Dashboard Stats Route
app.get('/dashboard-stats', authenticateToken, async (req, res) => {
  try {
    const [totalStaff] = await query('SELECT COUNT(*) AS count FROM users WHERE role = "staff"');
    const [totalTrainers] = await query('SELECT COUNT(*) AS count FROM users WHERE role = "trainer"');
    const [presentToday] = await query('SELECT COUNT(*) AS count FROM attendance WHERE date = CURDATE() AND status = "present"');
    const [absentToday] = await query('SELECT COUNT(*) AS count FROM attendance WHERE date = CURDATE() AND status = "absent"');

    res.json({
      totalStaff: totalStaff.count,
      totalTrainers: totalTrainers.count,
      presentToday: presentToday.count,
      absentToday: absentToday.count
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle Port Already in Use Error
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Trying a new port...`);
    setTimeout(() => {
      app.listen(0, () => {
        console.log(`✅ New server started on an available port.`);
      });
    }, 1000);
  } else {
    console.error('❌ Server error:', err);
  }
});