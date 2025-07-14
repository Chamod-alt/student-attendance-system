//import db from "../firebase/config.js";
import { validationResult } from "express-validator";


import { db } from "../firebase/config.js"; //  Correct way to import database

const gradesRef = db.ref("grades");


export const addGrade = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { name } = req.body;

  try {
    const snapshot = await gradesRef.once("value");
    const grades = snapshot.val() || {};

    const isDuplicate = Object.values(grades).some( //check duplicate 
      (grade) => grade.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      return res.status(400).json({ error: "Grade with the same name already exists" });
    }

    const newGradeRef = gradesRef.push();//push items to newGradeRef
    await newGradeRef.set({ name });

    res.status(201).json({ id: newGradeRef.key, name });
  } catch (err) {
    console.error("Error adding grade:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};



//get grades list
export const getGrades = async (req, res) => {
  const snapshot = await gradesRef.once("value");
  const grades = snapshot.val() || {};
  res.json(grades);
};
//update grade 
export const updateGrade = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  await gradesRef.child(id).update({ name });
  res.json({ message: "Grade updated" });
};
//delete grade
export const deleteGrade = async (req, res) => {
  const { id } = req.params;
  await gradesRef.child(id).remove();
  res.json({ message: "Grade deleted" });
};
