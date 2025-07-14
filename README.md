# 🎓 Student Attendance System – Backend

This is the backend for the **Student Attendance System**, developed using **Node.js**, **Express**, and **Firebase Realtime Database**. It handles grades, classes, and student data including attendance tracking.

---
## vedio link

https://youtu.be/S_zuI26n7x0?si=-FLovZcgF4ZhFUM8

---

## 🚀 Technologies Used

- Node.js  
- Express.js  
- Firebase Admin SDK  
- Firebase Realtime Database  
- Express Validator  
- Jest (Testing)  
- Supertest (HTTP testing)

---


## 📦 API Endpoints

### 📘 Grades

- `GET /api/grades` – Get all grades
- `POST /api/grades` – Add a new grade  
---

 ### 📙 Classes
-`GET /api/classes/:gradeId` – Get all classes for a grade
  
-`POST /api/classes/:gradeId`- – Add a class to a grade

### 📙 Students

`GET /api/students/:gradeId/:classId` – Get all students in a class

`POST /api/students/:gradeId/:classId` – Add a new student

  ---
### run commands
- `npm test` -run test
- `npm install` 
- `npm server.js`- run the server
  



