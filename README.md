# Task Management System

A full-stack task management system with authentication, role-based access, task CRUD, caching, and a clean React frontend.

📌 Features
🔐 Authentication

User registration & login

JWT-based auth

Protected routes

Role-based access (admin/user)

📝 Task Management

Create, Read, Update, Delete tasks

Admin: access all tasks

User: access only their tasks

⚡ Performance

Redis caching for GET tasks

Returns "source": "cache" or "source": "db"

🛡 Backend Quality

Centralized error handler

Input validation with Joi

Winston request + error logging

API versioning

Security middlewares (helmet, morgan, rate-limiter)

🖥 Frontend

React + Vite + Tailwind CSS

Login / Signup pages

Protected routes

Add task UI

All tasks UI

Logout

Clean, minimal UI

🛠 Tech Stack

Frontend: React, Tailwind CSS, React Router
Backend: Node.js, Express.js
Database: MongoDB
Cache: Redis
Auth: JWT
Logging: Winston
Tools: Postman, Vite

## 📁 Project Status

- [x] Project initialization
- [x] Backend setup
- [x] Database connection (MongoDB)
- [x] Authentication (JWT)
- [x] Role-based access
- [x] Task Model Added
- [x] Task CRUD
- [x] Input validation (Joi)
- [x] Centralized error handler
- [x] Security middlewares & request logging
- [x] API Versioning
- [x] Postman API Collection Added
- [x] Logging system using Winston (Request & Error Logging)
- [x] Redis caching implemented for GET tasks (cache & DB source)
- [x] Frontend UI (Login, Signup, Add Task, All Tasks, Protected Routes, Logout)

🚀 Installation & Setup

## Backend
cd backend
npm install
npm run dev

## Frontend
cd frontend
npm install
npm run dev

🧪 Postman Collection

 ## The complete Postman collection is available here:

/postman

