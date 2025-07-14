import express from "express";
import { body } from "express-validator";
import {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

//router.post("/:gradeId/:classId", body("name").notEmpty(), addStudent);

router.post(
  "/:gradeId/:classId",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("age").isInt(),
    body("rollNo").isInt(),
    body("attendance").notEmpty(),
    body("date").isISO8601()
  ],
  addStudent
);

//
router.get("/:gradeId/:classId", getStudents);
router.put("/:gradeId/:classId/:studentId", updateStudent);
router.delete("/:gradeId/:classId/:studentId", deleteStudent);

export default router;
