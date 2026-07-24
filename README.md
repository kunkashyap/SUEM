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

---

## Clinical Cases

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

---

## Backend

- FastAPI
- Uvicorn
- Motor
- MongoDB
- Pydantic
- JWT Authentication
- BCrypt
- Python Dotenv
- Pandas
- NumPy

---

## Database

MongoDB

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
cd surgery_reo
```

---

# Backend Setup

## Step 1

Navigate into backend

```bash
cd backend
```

---

## Step 2

Create Virtual Environment

Windows

```bash
python -m venv venv
```

---

## Step 3

Activate Virtual Environment

Windows

```bash
venv\Scripts\activate
```

Linux / macOS

```bash
source venv/bin/activate
```

---

## Step 4

Install Dependencies

```bash
pip install -r requirements.txt
```

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
```

Example:

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=medsim
JWT_SECRET=your-secret-key
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=10080
EMERGENT_LLM_KEY=
```

---

# Run Backend

From inside backend:

```bash
python -m uvicorn server:app --reload
```

or

```bash
uvicorn server:app --reload
```

Backend will start on

```
http://127.0.0.1:8000
```

---

# API Documentation

Swagger

```
http://127.0.0.1:8000/docs
```

ReDoc

```
http://127.0.0.1:8000/redoc
```

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

```
http://localhost:3000
```

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

```bash
pip install -r requirements.txt
```

---

Run Backend

```bash
python -m uvicorn server:app --reload
```

---

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
