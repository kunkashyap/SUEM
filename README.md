<<<<<<< HEAD
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
=======
# 🏥 MedSim – Interactive 3D Medical Surgery Training Platform

An interactive web-based medical simulation platform designed to help medical students and healthcare professionals learn anatomy, practice surgical procedures, solve clinical cases, and receive AI-assisted guidance through realistic simulations.

---

# 📌 Overview

MedSim is a full-stack web application consisting of:

- 🧠 AI-assisted Surgical Tutor
- 🫀 Interactive 3D Surgical Simulations
- 📚 Anatomy Learning Modules
- 🩺 Clinical Case Simulations
- ❓ Medical Quiz System
- 🔐 Secure Authentication
- 📊 Progress Tracking
- 🔍 Search Functionality

The application is built using **React** on the frontend and **FastAPI** on the backend with **MongoDB** as the database.

---

# 🏗 Project Architecture

```
surgery_reo/
│
├── backend/
│   ├── server.py
│   ├── data.py
│   ├── requirements.txt
│   ├── .env
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── README.md
└── ...
```

---

# 🚀 Features

## Authentication

- User Registration
- Login
- JWT Authentication
- Password Hashing using BCrypt

---

## Anatomy Learning

- Human Anatomy Explorer
- Layer-based Anatomy Visualization
- Structure Identification

---

## Surgical Simulation

- Interactive Surgical Procedures
- Step-by-step Surgery Guidance
- Procedure Metadata
- Surgical Workflow
>>>>>>> 8f0359a12ae61c865347147ef0eee84171aacbeb

---

## Clinical Cases

<<<<<<< HEAD
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
=======
- Patient Case Studies
- Clinical Decision Making
- Diagnosis Practice

---

## Medical Quizzes

- Topic-wise Quizzes
- Performance Tracking

---

## AI Tutor

- Claude-powered Medical Tutor
- Surgical Guidance
- Context-aware Conversations
- Real-time Streaming Responses

> **Note**
>
> The AI Tutor depends on the `emergentintegrations` package and a valid `EMERGENT_LLM_KEY`. If unavailable, the AI Tutor module may be disabled while the remaining backend continues to function.

---

# 🛠 Tech Stack

## Frontend

- React
- React Router
- Tailwind CSS
- ShadCN UI
- Radix UI
- Axios
- React Query
- SWR
- Framer Motion
- Three.js
- React Three Fiber
- React Hook Form
- Zod
- Recharts
- Lucide Icons
>>>>>>> 8f0359a12ae61c865347147ef0eee84171aacbeb

---

## Backend

- FastAPI
<<<<<<< HEAD
- Python
- JWT Authentication
- BCrypt
- Motor (Async MongoDB Driver)
- Uvicorn
=======
- Uvicorn
- Motor
- MongoDB
- Pydantic
- JWT Authentication
- BCrypt
- Python Dotenv
- Pandas
- NumPy
>>>>>>> 8f0359a12ae61c865347147ef0eee84171aacbeb

---

## Database

MongoDB

<<<<<<< HEAD
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

=======
---

## AI

- Claude (Anthropic)
- Emergent Integrations SDK

---

# 📦 Prerequisites

Install the following before running the project.

## Node.js

Recommended:

```
v20+
```

Download:

https://nodejs.org

---

## Python

Recommended:

```
Python 3.11
```

Python 3.13 may introduce dependency compatibility issues with some packages.

Download:

https://www.python.org/

---

## MongoDB

Install MongoDB Community Server

https://www.mongodb.com/try/download/community

or

Use MongoDB Atlas.

---

# Clone Repository

```bash
git clone <repository-url>
```

```
>>>>>>> 8f0359a12ae61c865347147ef0eee84171aacbeb
cd surgery_reo
```

---

<<<<<<< HEAD
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
=======
# Backend Setup

## Step 1

Navigate into backend
>>>>>>> 8f0359a12ae61c865347147ef0eee84171aacbeb

```bash
cd backend
```

---

<<<<<<< HEAD
## Create a Virtual Environment

### Windows
=======
## Step 2

Create Virtual Environment

Windows
>>>>>>> 8f0359a12ae61c865347147ef0eee84171aacbeb

```bash
python -m venv venv
```

<<<<<<< HEAD
Activate it.
=======
---

## Step 3

Activate Virtual Environment

Windows
>>>>>>> 8f0359a12ae61c865347147ef0eee84171aacbeb

```bash
venv\Scripts\activate
```

<<<<<<< HEAD
### Linux / macOS

```bash
python3 -m venv venv

=======
Linux / macOS

```bash
>>>>>>> 8f0359a12ae61c865347147ef0eee84171aacbeb
source venv/bin/activate
```

---

<<<<<<< HEAD
## Install Python Dependencies
=======
## Step 4

Install Dependencies
>>>>>>> 8f0359a12ae61c865347147ef0eee84171aacbeb

```bash
pip install -r requirements.txt
```

<<<<<<< HEAD
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
=======
> If installation fails because of dependency conflicts:

```bash
pip install -r requirements.txt --no-deps
```

or install missing packages individually.

---

## Required Environment Variables

Create a file named

```
backend/.env
>>>>>>> 8f0359a12ae61c865347147ef0eee84171aacbeb
```

Example:

```env
<<<<<<< HEAD
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
=======
MONGO_URL=mongodb://localhost:27017
DB_NAME=medsim
JWT_SECRET=your-secret-key
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=10080
EMERGENT_LLM_KEY=
>>>>>>> 8f0359a12ae61c865347147ef0eee84171aacbeb
```

---

<<<<<<< HEAD
# Start the Backend Server

Run
=======
# Run Backend

From inside backend:

```bash
python -m uvicorn server:app --reload
```

or
>>>>>>> 8f0359a12ae61c865347147ef0eee84171aacbeb

```bash
uvicorn server:app --reload
```

<<<<<<< HEAD
The backend server will start at
=======
Backend will start on
>>>>>>> 8f0359a12ae61c865347147ef0eee84171aacbeb

```
http://127.0.0.1:8000
```

---

<<<<<<< HEAD
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
=======
# API Documentation

Swagger
>>>>>>> 8f0359a12ae61c865347147ef0eee84171aacbeb

```
http://127.0.0.1:8000/docs
```

ReDoc

```
http://127.0.0.1:8000/redoc
```

<<<<<<< HEAD
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
=======
---

# Frontend Setup

Open a new terminal.

Navigate into frontend.

```bash
cd frontend
```

---

Install dependencies

```bash
npm install
```

If dependency conflicts occur:

```bash
npm install --legacy-peer-deps
```

If still unsuccessful:

```bash
npm install --force
```

---

Run Frontend

For Create React App

```bash
npm start
```

For Vite

```bash
npm run dev
```

(The appropriate command depends on the project's `package.json`.)

---

Frontend usually runs on
>>>>>>> 8f0359a12ae61c865347147ef0eee84171aacbeb

```
http://localhost:3000
```

<<<<<<< HEAD
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
=======
or

```
http://localhost:5173
```

---

# Backend Folder Structure

```
backend
│
├── server.py
│       Main FastAPI Application
│
├── data.py
│       Medical Data
│
├── requirements.txt
│
├── .env
│
└── ...
```

---

# Frontend Folder Structure

```
frontend
│
├── src
│
├── public
│
├── components
│
├── package.json
│
└── ...
```

---

# Common Commands

## Create Virtual Environment

```bash
python -m venv venv
```

Activate

```bash
venv\Scripts\activate
```

Deactivate

```bash
deactivate
```

---

Install Python Packages
>>>>>>> 8f0359a12ae61c865347147ef0eee84171aacbeb

```bash
pip install -r requirements.txt
```

---

<<<<<<< HEAD
### Port 8000 Already in Use

Terminate the process using the port or start Uvicorn on another port.

```bash
uvicorn server:app --reload --port 8001
=======
Run Backend

```bash
python -m uvicorn server:app --reload
>>>>>>> 8f0359a12ae61c865347147ef0eee84171aacbeb
```

---

<<<<<<< HEAD
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
=======
Install Frontend Packages

```bash
npm install
```

---

Ignore Peer Dependency Conflicts

```bash
npm install --legacy-peer-deps
```

---

Run React

```bash
npm start
```

or

```bash
npm run dev
```

---

# Environment Variables

| Variable | Description |
|-----------|-------------|
| MONGO_URL | MongoDB Connection URL |
| DB_NAME | MongoDB Database Name |
| JWT_SECRET | Secret key used for JWT Authentication |
| JWT_ALGORITHM | JWT Algorithm |
| JWT_EXPIRE_MINUTES | JWT Token Expiration Time |
| EMERGENT_LLM_KEY | API Key for AI Tutor |

---

# Troubleshooting

## "Could not import module 'server'"

Ensure you are inside the `backend` directory before running:

```bash
python -m uvicorn server:app --reload
```

---

## Missing `.env`

Create:

```
backend/.env
```

and add all required environment variables.

---

## `ModuleNotFoundError`

Install the missing dependency:

```bash
pip install <package-name>
```

Examples:

```bash
pip install python-dotenv
pip install bcrypt
pip install PyJWT
```

---

## Frontend Dependency Conflicts

Use:

```bash
npm install --legacy-peer-deps
```

---

## Backend Running but "/" Returns Not Found

This is expected.

Visit:

```
http://127.0.0.1:8000/docs
```

to access the API documentation.

---

# Future Improvements

- Enhanced AI Tutor
- Additional Surgical Procedures
- Real-time Collaborative Sessions
- User Progress Analytics
- Cloud Deployment
- Docker Support
- CI/CD Integration
- Automated Testing

---

# License

This project is intended for educational and research purposes.
>>>>>>> 8f0359a12ae61c865347147ef0eee84171aacbeb
