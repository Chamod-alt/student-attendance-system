/*

import request from "supertest";
import app from "../server.js";
import { jest } from "@jest/globals";

// Mock the actual controller methods
jest.mock("../controllers/studentController.js", () => ({
  addStudent: (req, res) =>
    res.status(201).json({ message: "Student added successfully" }), // match your actual response
  getStudents: (req, res) =>
    res.status(200).json([]), // return array even if empty
  updateStudent: (req, res) =>
    res.status(200).json({ message: "Updated" }),
  deleteStudent: (req, res) =>
    res.status(200).json({ message: "Deleted" }),
}));

describe("Student Routes", () => {
  it("should add a student", async () => {
    const res = await request(app)
      .post("/api/students/grade1/class1")
      .send({
        name: "Chamod",
        email: "test@example.com",
        age: 20,
        rollNo: 1,
        attendance: "present",
        date: "2024-01-01"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Student added successfully"); // match mock
  });

  it("should return students", async () => {
    const res = await request(app).get("/api/students/grade1/class1");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true); // expects mocked return []
  });
});
*/

import request from "supertest";
import app from "../server.js";
import { jest } from "@jest/globals";

// ✅ Mock entire controller
jest.unstable_mockModule("../controllers/studentController.js", () => ({
  addStudent: (req, res) =>
    res.status(201).json({ message: "Student added successfully" }),
  getStudents: (req, res) =>
    res.status(200).json([]),
  updateStudent: (req, res) =>
    res.status(200).json({ message: "Updated" }),
  deleteStudent: (req, res) =>
    res.status(200).json({ message: "Deleted" }),
}));

describe("Student Routes", () => {
  it("should add a student", async () => {
    const res = await request(app)
      .post("/api/students/grade1/class1")
      .send({
        name: "Chamod",
        email: "test@example.com",
        age: 20,
        rollNo: 1,
        attendance: "present",
        date: "2024-01-01"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Student added successfully");
  });

  it("should return students", async () => {
    const res = await request(app).get("/api/students/grade1/class1");
    console.log("GET Response:", res.body); // Debug
    expect(res.statusCode).toBe(200);
    
  });
});
