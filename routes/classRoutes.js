import express from "express";
import { body } from "express-validator";
import {
  addClass,
  getClasses,
  updateClass,
  deleteClass,
} from "../controllers/classController.js";

const router = express.Router();

router.post("/:gradeId", body("name").notEmpty(), addClass);
router.get("/:gradeId", getClasses);
router.put("/:gradeId/:classId", body("name").notEmpty(), updateClass);
router.delete("/:gradeId/:classId", deleteClass);

export default router;
