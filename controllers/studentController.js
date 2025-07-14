//import db from "../firebase/config.js";
import { validationResult } from "express-validator";
import {db} from "../firebase/config.js";


export const addStudent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { gradeId, classId } = req.params;
  const { name, email, age, rollNo, attendance,date } = req.body;

  try {
    const studentsRef = db.ref(`grades/${gradeId}/classes/${classId}/students`);
    const snapshot = await studentsRef.once("value");
    const students = snapshot.val() || {};

    //  Duplicate check
    const isDuplicate = Object.values(students).some(student => 
      student.rollNo == rollNo || student.email === email
    );

    if (isDuplicate) {
      return res.status(400).json({
        error: "Student with same roll number or email already exists"
      });
    }

    const newStudentRef = studentsRef.push();
    await newStudentRef.set({
      name,
      email,
      age,
      rollNo,
      attendance,
      date: date || new Date().toISOString()
    });

    res.status(201).json({
      message: "Student added successfully",
      studentId: newStudentRef.key,
      name: name
    });

  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//


export const getStudents = async (req, res) => {
  const { gradeId, classId } = req.params;
  const snapshot = await db.ref(`grades/${gradeId}/classes/${classId}/students`).once("value");
  const students = snapshot.val() || {};
  res.json(students);
};

export const updateStudent = async (req, res) => {
  const { gradeId, classId, studentId } = req.params;
  const { name, email, age, rollNo,attendance,date } = req.body;

  try {
    const studentRef = db.ref(`grades/${gradeId}/classes/${classId}/students/${studentId}`);

    // Check if student exists
    const snapshot = await studentRef.once("value");
    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Check for duplicates in rollNo or email
    const studentsRef = db.ref(`grades/${gradeId}/classes/${classId}/students`);
    const allStudentsSnap = await studentsRef.once("value");
    const students = allStudentsSnap.val() || {};

    const isDuplicate = Object.entries(students).some(([key, student]) =>
      key !== studentId && (student.rollNo == rollNo || student.email === email)
    );

    if (isDuplicate) {
      return res.status(400).json({
        error: "Another student with same roll number or email already exists"
      });
    }

    // Update the student
    await studentRef.update({ name, email, age, rollNo,attendance, ...(date && { date }) });

    res.json({ message: "Student updated successfully" });

  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


//
export const deleteStudent = async (req, res) => {
  const { gradeId, classId, studentId } = req.params;
  await db.ref(`grades/${gradeId}/classes/${classId}/students/${studentId}`).remove();
  res.json({ message: "Student deleted" });
};
