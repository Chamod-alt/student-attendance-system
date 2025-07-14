import express from 'express';
import cors from 'cors';
import gradeRoutes from './routes/gradeRoutes.js';
import classRoutes from './routes/classRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/grades', gradeRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/students', studentRoutes);

{/*
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
*/}

if (process.env.NODE_ENV !== 'test') {
  app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
  });
}


export default app;