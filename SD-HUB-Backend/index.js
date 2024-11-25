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
const db = client.db('SD-HUB');
const collection = db.collection('students');
const ucollection = db.collection('user');

function generateUniqueId() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

app.get('/generate-unique-id', async (req, res) => {
  let uniqueId;
  let isUnique = false;

  while (!isUnique) {
    uniqueId = generateUniqueId();
    const existingStudent = await collection.findOne({ uniqueId });
    if (!existingStudent) {
      isUnique = true;
    }
  }

  res.json({ uniqueId });
});


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
    req.body['role'] = 'student';
    const inserted = await ucollection.insertOne(req.body);
    console.log(inserted);
    res.status(200).json(inserted);
});

app.post('/approve', async (req, res) => {
    console.log(req.body);
    const updateResult = await collection.updateOne({ email: req.body.email }, { $set: { status: 'active' } });
    console.log('Updated documents =>', updateResult);
    res.status(200).json(updateResult);
});

// app.post('/student-signin', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//       const student = await ucollection.findOne({ email, password });
//       console.log(student);
      
//       if (student) {
//         if(student.status != 'pending'){
//           const token = jwt.sign({ id: student._id, email: student.email, role: 'student' }, SECRET_KEY, { expiresIn: '1h' });
//           res.status(200).json({
//             token,
//             user: {
//               id: student._id,
//               email: student.email,
//               role: 'student'
//             },
//             message: 'Student sign-in successful!'
//           });
//         }
//         else{
//           res.status(200).json({ message: 'Student acccount inactive' });
//         }
//       } else {
//         res.status(401).json({ message: 'Invalid student credentials' });
//       }
//     } catch (error) {
//       console.error('Student signin error:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
  
  // app.post('/admin-signin', async (req, res) => {
  //   const { email, password } = req.body;
  //   try {
  //     const admin = await ucollection.findOne({ email, password, role: 'admin' });
      
  //     if (admin) {
  //       const token = jwt.sign({ id: admin._id, email: admin.email, role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
  //       res.status(200).json({
  //         token,
  //         user: {
  //           id: admin._id,
  //           email: admin.email,
  //           role: 'admin'
  //         }
  //       });
  //     } else {
  //       res.status(401).json({ message: 'Invalid admin credentials' });
  //     }
  //   } catch (error) {
  //     console.error('Admin signin error:', error);
  //     res.status(500).json({ message: 'Server error' });
  //   }
  // });

  app.post('/signin', async (req, res) => {
    const { email, password, role } = req.body;
    try {
      const user = await ucollection.findOne({ email, password, role });
      
      if (user) {
        if(user.status === 'pending') {
          res.status(200).json({ message: 'Account is pending activation' });
          return;
        }
  
        const token = jwt.sign(
          { id: user._id, email: user.email, role: user.role },
          SECRET_KEY,
          { expiresIn: '1h' }
        );
  
        res.status(200).json({
          token,
          user: {
            id: user._id,
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
        const users = await collection.find({}).toArray(); 
        res.status(200).json(users);
});

app.get('/signupusers', async (req, res) => {
  const users = await ucollection.find({}).toArray(); 
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