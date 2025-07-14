import express from "express";
import { body } from "express-validator";
import {
  addGrade,
  getGrades,
  updateGrade,
  deleteGrade,
} from "../controllers/gradeController.js";

const router = express.Router();

router.post("/", body("name").notEmpty(), addGrade);
router.get("/", getGrades);
router.put("/:id", body("name").notEmpty(), updateGrade);
router.delete("/:id", deleteGrade);

export default router;
