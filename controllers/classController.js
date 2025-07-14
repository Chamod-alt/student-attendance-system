//import db from "../firebase/config.js";
import { validationResult } from "express-validator";

import {db} from "../firebase/config.js";


export const addClass = async (req, res) => {
  const { gradeId } = req.params;
  const { name } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const classesRef = db.ref(`grades/${gradeId}/classes`);//db class parth
    const snapshot = await classesRef.once("value");
    const classes = snapshot.val() || {};

    const isDuplicate = Object.values(classes).some(
      (cls) => cls.name.toLowerCase() === name.toLowerCase()// check duplicate
    );

    if (isDuplicate) {
      return res.status(400).json({ error: "Class with the same name already exists in this grade" });
    }
  //push to newClassref
    const newClassRef = classesRef.push();
    await newClassRef.set({ name });

    res.status(201).json({ id: newClassRef.key, name });
  } catch (err) {
    console.error("Error adding class:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};





//get classes list
export const getClasses = async (req, res) => {
  const snapshot = await db.ref(`grades/${req.params.gradeId}/classes`).once("value");
  const classes = snapshot.val() || {};
  res.json(classes);
};
//updatt classes in gradeID
export const updateClass = async (req, res) => {
  const { gradeId, classId } = req.params;
  await db.ref(`grades/${gradeId}/classes/${classId}`).update({ name: req.body.name });
  res.json({ message: "Class updated" });
};
// delete classes in gradeID
export const deleteClass = async (req, res) => {
  const { gradeId, classId } = req.params;
  await db.ref(`grades/${gradeId}/classes/${classId}`).remove();
  res.json({ message: "Class deleted" });
};
