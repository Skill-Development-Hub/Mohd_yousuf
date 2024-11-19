import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_secret_key';

app.use(cors());
app.use(express.json());


const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
await client.connect();
console.log("Database Connected");
const db = client.db('SD_HUB');
const collection = db.collection('students');
const ucollection = db.collection('user');


app.post('/addstudents', async (req, res) => {
    console.log(req.body);
    const inserted = await collection.insertMany([req.body]);
    console.log(inserted);
    // const newStudent = new Students(req.body);
    // await newStudent.save();
    res.status(201).json(inserted);
})

app.post('/signup', async (req, res) => {
    console.log(req.body);
    const inserted = await collection.insertOne(req.body);
    console.log(inserted);
    res.status(401).json({ message: 'Invalid credentials'});
});

app.post('/student-signin', async (req, res) => {
    const { email, password } = req.body;
    try {
      const student = await collection.findOne({ email, password });
      
      if (student) {
        const token = jwt.sign({ id: student._id, email: student.email, role: 'student' }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({
          token,
          user: {
            id: student._id,
            email: student.email,
            role: 'student'
          }
        });
      } else {
        res.status(401).json({ message: 'Invalid student credentials' });
      }
    } catch (error) {
      console.error('Student signin error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.post('/admin-signin', async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await ucollection.findOne({ email, password, role: 'admin' });
      
      if (admin) {
        const token = jwt.sign({ id: admin._id, email: admin.email, role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({
          token,
          user: {
            id: admin._id,
            email: admin.email,
            role: 'admin'
          }
        });
      } else {
        res.status(401).json({ message: 'Invalid admin credentials' });
      }
    } catch (error) {
      console.error('Admin signin error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

app.get('/users', async (req, res) => {
        const users = await collection.find({}).toArray(); 
        res.status(200).json(users);
});

app.get('/gettech', async (req, res) => {
    const collection = db.collection('trainers');
    const gettech = await collection.find({}).toArray(); 
    res.status(200).json(gettech);
});

app.get('/studentsStatus', async (req, res) => {
    const collection = db.collection('students');
    const std_status = await collection.aggregate([ { $group: { _id: "$status", count: { $sum: 1 } }} ]).toArray();

    if(std_status != null){
        res.status(201).json(std_status);
    }
    else{
        res.status(401).json({ message: 'No Data'});
    }
});

app.get('/tStatus', async (req, res) => {
    const collection = db.collection('trainers');
    const t_status = await collection.aggregate([ { $group: { _id: "$status", count: { $sum: 1 } }} ]).toArray();

    if(t_status != null){
        res.status(201).json(t_status);
    }
    else{
        res.status(401).json({ message: 'No Data'});
    }
});

// student table
app.get('/students', async (req, res) => {
    const collection = db.collection('students');
    const students = await collection.find({}).toArray(); 
    res.status(200).json(students);
});

app.get('/trainers', async (req, res) => {
    const collection = db.collection('trainers');
    const students = await collection.find({}).toArray(); 
    res.status(200).json(students);
});

app.get('/deans', async (req, res) => {
    const collection = db.collection('deans');
    const students = await collection.find({}).toArray(); 
    res.status(200).json(students);
});

app.get('/courses', async (req, res) => {
    const collection = db.collection('courses');
    const courses = await collection.find({}).toArray(); 
    res.status(200).json(courses);
});

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
})