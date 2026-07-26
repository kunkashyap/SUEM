# 🫀 MedSim – Interactive Surgical Training & 3D Medical Simulation Platform

![React](https://img.shields.io/badge/Frontend-React-blue)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![Three.js](https://img.shields.io/badge/3D-Three.js-black)
![License](https://img.shields.io/badge/Status-Development-orange)

---

# Overview

MedSim is a next-generation web-based surgical training platform designed to provide an interactive and immersive learning environment for medical students, healthcare professionals, and surgical trainees.

The objective of MedSim is to bridge the gap between theoretical medical education and practical surgical experience by allowing users to visualize human anatomy in 3D, perform virtual surgical procedures, analyze their performance, and continuously improve through personalized feedback.

Unlike traditional learning platforms that rely solely on textbooks or videos, MedSim enables users to actively engage with anatomy and surgical workflows inside an interactive simulation environment.

---

# Vision

The long-term vision of MedSim is to become an intelligent surgical training ecosystem capable of providing:

- Realistic surgical simulations
- Interactive anatomy exploration
- AI-assisted learning
- Performance analytics
- Procedure-based training
- Clinical case practice
- Multiplayer collaborative surgery
- Surgical education for institutions

The platform aims to make surgical education more accessible, engaging, and measurable.

---

# Features

## User Authentication

- Secure Registration
- Secure Login
- JWT Authentication
- Password Hashing using BCrypt
- Persistent Login Sessions
- Protected API Routes

---

## 3D Human Anatomy Explorer

Explore interactive 3D organs including:

- Heart
- Brain
- Lungs
- Liver
- Kidneys
- Skeleton
- Blood Vessels
- Future Organ Library

Users can rotate, zoom and inspect anatomical structures.

---

## Surgical Simulations

The platform contains procedure-based simulations including:

- Heart Surgery
- Appendectomy
- Trauma Procedures
- Emergency Response
- Additional surgical procedures planned

Each simulation consists of procedural steps, scoring, and analytics.

---

## Medical Quiz Center

Interactive quizzes for reinforcing theoretical concepts.

Features include:

- Multiple Choice Questions
- Instant Evaluation
- Score Calculation
- XP Rewards
- Progress Tracking

---

## Clinical Cases

Practice diagnosis using realistic patient scenarios.

Users analyze:

- Symptoms
- Medical History
- Vital Signs
- Diagnostic Findings

and determine the most appropriate diagnosis or treatment.

---

## Student Dashboard

Each user has a personalized dashboard displaying:

- Total XP
- Average Accuracy
- Surgical Streak
- Recent Attempts
- Quiz Scores
- Weak Areas
- Skill Radar
- Performance Charts
- Learning Progress

---

## Leaderboard

Compete with other learners through:

- XP Ranking
- Institution Ranking
- Student Comparison

---

## Search System

Search for:

- Anatomy
- Procedures
- Simulations
- Clinical Cases

from one centralized search bar.

---

## Dark Mode

The application supports:

- Light Theme
- Dark Theme
- Automatic Theme Detection
- Theme Persistence

---

## Responsive Design

Optimized for:

- Desktop
- Laptop
- Tablet
- Mobile

---

# Technology Stack

## Frontend

- React.js
- JavaScript
- React Router
- Axios
- Tailwind CSS
- Lucide Icons
- Framer Motion
- Three.js
- React Three Fiber
- Drei

---

## Backend

- FastAPI
- Python
- JWT Authentication
- BCrypt
- Motor (Async MongoDB Driver)
- Uvicorn

---

## Database

MongoDB

Collections include:

- Users
- Attempts
- Quiz Results
- Tutor Messages
- Future Analytics

---

## 3D Technologies

- Three.js
- GLTF Loader
- OBJ Loader
- Orbit Controls
- HDR Environment Maps

---

# ⚙️ Installation Guide

Follow the steps below to set up MedSim on your local machine.

---

## Prerequisites

Before starting, make sure the following software is installed on your system.

### Required Software

- Node.js (v18 or above)
- npm (comes with Node.js)
- Python (v3.11 or above)
- Git
- MongoDB Atlas Account (or Local MongoDB Server)
- Visual Studio Code (Recommended)

---

## Step 1 — Clone the Repository

```bash
git clone https://github.com/<your-username>/surgery_reo.git

cd surgery_reo
```

---

# Frontend Installation

Navigate to the frontend directory.

```bash
cd frontend
```

Install all required dependencies.

```bash
npm install
```

Start the React development server.

```bash
npm start
```

The frontend will start at

```
http://localhost:3000
```

---

# Backend Installation

Open another terminal.

Navigate to the backend folder.

```bash
cd backend
```

---

## Create a Virtual Environment

### Windows

```bash
python -m venv venv
```

Activate it.

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv venv

source venv/bin/activate
```

---

## Install Python Dependencies

```bash
pip install -r requirements.txt
```

If your `requirements.txt` is outdated, install the packages manually.

```bash
pip install fastapi
pip install uvicorn
pip install motor
pip install pymongo
pip install python-dotenv
pip install bcrypt
pip install PyJWT
pip install email-validator
```

---

# Configure Environment Variables

Inside the **backend** folder, create a file named

```
.env
```

Example:

```env
MONGO_URL=your_mongodb_connection_string

DB_NAME=medsim

JWT_SECRET=your_secret_key

JWT_ALGORITHM=HS256

JWT_EXPIRE_MINUTES=10080
```

Replace these values with your own configuration.

---

# MongoDB Setup

Create a MongoDB database.

Example Database Name

```
medsim
```

No collections need to be created manually.

FastAPI will automatically create them when users register or interact with the application.

Typical collections include

```
users

attempts

quiz_results

tutor_messages
```

---

# Start the Backend Server

Run

```bash
uvicorn server:app --reload
```

The backend server will start at

```
http://127.0.0.1:8000
```

---

# Verify Backend

Open

```
http://127.0.0.1:8000/api
```

Expected response

```json
{
  "service": "MedSim API",
  "ok": true
}
```

---

# API Documentation

Swagger UI

```
http://127.0.0.1:8000/docs
```

ReDoc

```
http://127.0.0.1:8000/redoc
```

These pages allow you to test every API endpoint directly from your browser.

---

# Running the Complete Project

Open two terminals.

### Terminal 1

```bash
cd backend

venv\Scripts\activate

uvicorn server:app --reload
```

### Terminal 2

```bash
cd frontend

npm start
```

Now open

```
http://localhost:3000
```

Your MedSim application should now be running successfully.

---

# Default Workflow

1. Start MongoDB.
2. Start the FastAPI backend.
3. Start the React frontend.
4. Register a new account.
5. Log in to the application.
6. Explore simulations, quizzes, anatomy models, and dashboards.

---

# Troubleshooting

### Backend shows "ModuleNotFoundError"

Install missing packages.

```bash
pip install -r requirements.txt
```

---

### Port 8000 Already in Use

Terminate the process using the port or start Uvicorn on another port.

```bash
uvicorn server:app --reload --port 8001
```

---

### Port 3000 Already in Use

React will prompt you to run on another available port.

---

### MongoDB Connection Failed

Check that:

- MongoDB is running.
- Your `MONGO_URL` is correct.
- Your IP address is whitelisted (MongoDB Atlas).
- Your database user credentials are valid.

---

### Login Returns 401 Unauthorized

Verify:

- The user exists in MongoDB.
- The password is correct.
- The JWT configuration in `.env` is correct.

---

### Frontend Displays Network Error

Ensure:

- The FastAPI backend is running.
- The frontend is using the correct backend URL.
- CORS is configured to allow requests from `http://localhost:3000`.

---

# Project URLs

| Service | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://127.0.0.1:8000 |
| API Documentation | http://127.0.0.1:8000/docs |
| ReDoc | http://127.0.0.1:8000/redoc |

---

# You're Ready!

Once both servers are running, you can begin using MedSim by registering an account, logging in, and exploring the platform's simulations, quizzes, anatomy explorer, and performance dashboard.
