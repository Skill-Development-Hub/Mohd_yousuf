import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_secret_key';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sd-hub'
};

const pool = mysql.createPool(dbConfig);

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: 'mohdyousuf9059@gmail.com',
    pass: 'jjfi atzp frdz znil'
  }
});

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

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, course, contactNumber, email, status } = req.body;
  
  if (!name || !course || !contactNumber || !email || !status) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  const query = 'UPDATE users SET name = ?, course = ?, contactNumber = ?, email = ?, status = ? WHERE id = ?';
  db.query(query, [name, course, contactNumber, email, status, id], (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ error: 'Failed to update user' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ id, ...req.body });
  });
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  
  db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ error: 'Failed to delete user' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  });
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

// New endpoints for trainer CRUD operations
app.post('/trainers', async (req, res) => {
  try {
    const [result] = await pool.query('INSERT INTO trainers SET ?', req.body);
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    console.error('Error adding trainer:', error);
    res.status(500).json({ error: 'Failed to add trainer' });
  }
});

app.put('/trainers/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query('UPDATE trainers SET ? WHERE id = ?', [req.body, id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Trainer not found' });
    }
    
    res.status(200).json({ id, ...req.body });
  } catch (error) {
    console.error('Error updating trainer:', error);
    res.status(500).json({ error: 'Failed to update trainer' });
  }
});

app.delete('/trainers/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query('DELETE FROM trainers WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Trainer not found' });
    }
    
    res.status(200).json({ message: 'Trainer deleted successfully' });
  } catch (error) {
    console.error('Error deleting trainer:', error);
    res.status(500).json({ error: 'Failed to delete trainer' });
  }
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
  const [rows] = await pool.query('SELECT * FROM questions');
  res.status(200).json(rows);
});


app.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const connection = await pool.getConnection();
    
    // Insert into database
    await connection.query(
      'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)',
      [name, email, phone, message]
    );
    
    connection.release();

    // Send email
    const mailOptions = {
      from: 'mohdyousuf@gmail.com',
      to: 'mohdyousuf9059@gmail.com',
      subject: 'New Contact Form Submission',
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

app.post('/submit-test', async (req, res) => {
  try {
    const testData = req.body;
    const [result] = await pool.query(
      'INSERT INTO test_results (email, fullName, gender, courseApplied, marksScored) VALUES (?, ?, ?, ?, ?)',
      [testData.email, testData.fullName, testData.gender, testData.courseApplied, testData.marksScored]
    );
    res.status(201).json({ message: 'Test submitted successfully' });
  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({ error: 'Failed to submit test' });
  }
});

// Get test results
app.get('/test-results', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT email, fullName, gender, courseApplied, marksScored FROM test_results');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching test results:', error);
    res.status(500).json({ error: 'Failed to fetch test results' });
  }
});

app.put('/students/:id', (req, res) => {
  const { id } = req.params;
  const { uniqueId, firstName, lastName, applicationDate, course, email } = req.body;
  
  if (!uniqueId || !firstName || !lastName || !applicationDate || !course || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  const query = 'UPDATE students SET uniqueId = ?, firstName = ?, lastName = ?, applicationDate = ?, course = ?, email = ? WHERE id = ?';
  db.query(query, [uniqueId, firstName, lastName, applicationDate, course, email, id], (err, result) => {
    if (err) {
      console.error('Error updating student:', err);
      return res.status(500).json({ error: 'Failed to update student' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json({ id, ...req.body });
  });
});

app.delete('/students/:id', (req, res) => {
  const { id } = req.params;
  
  db.query('DELETE FROM students WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting student:', err);
      return res.status(500).json({ error: 'Failed to delete student' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json({ message: 'Student deleted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});