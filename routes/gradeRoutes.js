import express from "express";
import { body } from "express-validator";
import {
  addGrade,
  getGrades,
  updateGrade,
  deleteGrade,
} from "../controllers/gradeController.js";

const router = express.Router();

router.post("/", body("name").notEmpty(), addGrade);//post route
router.get("/", getGrades);// geet route
router.put("/:id", body("name").notEmpty(), updateGrade);// put route
router.delete("/:id", deleteGrade);//delete route

export default router;
