import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3001;
const SECRET_KEY = 'your_secret_key';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.get('/sdhub/', (req, res) => {
  res.send('Welcome to SD-HUB Backend!');
});


const allowedOrigins = ['http://localhost', 'http://localhost:4200', 'http://example.com'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST']
}));


const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sd_hub'
};

const pool = mysql.createPool(dbConfig);

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Received message:', message);

    const pythonPath = 'python'; // or 'python3' depending on your system
    const scriptPath = path.join(__dirname, 'app.py');

    console.log('Executing Python script:', scriptPath);

    const pythonProcess = spawn(pythonPath, [
      scriptPath,
      '--message',
      message
    ]);

    let responseData = '';
    let errorData = '';

    pythonProcess.stdout.on('data', (data) => {
      console.log('Python stdout:', data.toString());
      responseData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error('Python stderr:', data.toString());
      errorData += data.toString();
    });

    pythonProcess.on('close', (code) => {
      console.log('Python process exited with code:', code);

      if (code !== 0) {
        console.error('Python error output:', errorData);
        return res.status(500).json({
          error: 'Chatbot process failed',
          details: errorData
        });
      }

      if (responseData.trim()) {
        res.json({ response: responseData.trim() });
      } else {
        res.status(500).json({
          error: 'No response from chatbot',
          details: errorData || 'No error details available'
        });
      }
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});


function generateUniqueId() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

app.get('/generate-unique-id', async (req, res) => {
  let uniqueId;
  let isUnique = false;

  while (!isUnique) {
    uniqueId = generateUniqueId();
    const [rows] = await pool.query('SELECT * FROM students WHERE uniqueId = ?', [uniqueId]);
    if (rows.length === 0) {
      isUnique = true;
    }
  }

  res.json({ uniqueId });
});

app.post('/addstudents', async (req, res) => {
  console.log(req.body);
  const [result] = await pool.query('INSERT INTO students SET ?', req.body);
  console.log(result);
  res.status(201).json(result);
});

app.post('/signup', async (req, res) => {
  console.log(req.body);
  req.body['role'] = 'student';
  const [result] = await pool.query('INSERT INTO user SET ?', req.body);
  console.log(result);
  res.status(200).json(result);
});

app.post('/approve', async (req, res) => {
  console.log(req.body);
  const [result] = await pool.query('UPDATE students SET status = ? WHERE email = ?', ['active', req.body.email]);
  console.log('Updated documents =>', result);
  res.status(200).json(result);
});

app.post('/signin', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM user WHERE email = ? AND password = ? AND role = ?', [email, password, role]);

    if (rows.length > 0) {
      const user = rows[0];
      if (user.status === 'pending') {
        res.status(200).json({ message: 'Account is pending activation' });
        return;
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      res.status(200).json({
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        },
        message: `${role.charAt(0).toUpperCase() + role.slice(1)} sign-in successful!`
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Sign-in error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/users', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM students');
  res.status(200).json(rows);
});

app.get('/signupusers', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM user');
  res.status(200).json(rows);
});

app.get('/gettech', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM trainers');
  res.status(200).json(rows);
});

app.get('/studentsStatus', async (req, res) => {
  const [rows] = await pool.query('SELECT status, COUNT(*) as count FROM students GROUP BY status');
  if (rows.length > 0) {
    res.status(201).json(rows);
  } else {
    res.status(401).json({ message: 'No Data' });
  }
});

app.get('/tStatus', async (req, res) => {
  const [rows] = await pool.query('SELECT status, COUNT(*) as count FROM trainers GROUP BY status');
  if (rows.length > 0) {
    res.status(201).json(rows);
  } else {
    res.status(401).json({ message: 'No Data' });
  }
});

app.get('/students', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM students');
  res.status(200).json(rows);
});

app.get('/trainers', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM trainers');
  res.status(200).json(rows);
});

app.get('/deans', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM deans');
  res.status(200).json(rows);
});

app.get('/courses', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM courses');
  res.status(200).json(rows);
});

app.get('/aptitude', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM aptitude_test');
  res.status(200).json(rows);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});