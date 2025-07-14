import express from "express";
import { body } from "express-validator";
import {
  addClass,
  getClasses,
  updateClass,
  deleteClass,
} from "../controllers/classController.js";

const router = express.Router();

router.post("/:gradeId", body("name").notEmpty(), addClass); //post route
router.get("/:gradeId", getClasses);// get route
router.put("/:gradeId/:classId", body("name").notEmpty(), updateClass);// update route
router.delete("/:gradeId/:classId", deleteClass);// delete route

export default router;
