import express from "express";
import { body } from "express-validator";
import {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();


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
);//post route

//
router.get("/:gradeId/:classId", getStudents);//get route
router.put("/:gradeId/:classId/:studentId", updateStudent);//put route
router.delete("/:gradeId/:classId/:studentId", deleteStudent);//delete route

export default router;
