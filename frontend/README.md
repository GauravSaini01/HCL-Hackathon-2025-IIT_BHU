# 🌐 **Healthcare Wellness & Preventive Care Portal — MVP**

A secure, cloud-hosted healthcare portal built to help patients track wellness goals and stay compliant with preventive checkups—while enabling healthcare providers to monitor patient progress.

This MVP demonstrates strong architecture, security, teamwork, and cloud deployment within a short development timeline.

---

# 🚀 **1. Features (MVP Scope)**

### 🔐 Authentication & Security

* Patient & Healthcare Provider login/registration
* JWT authentication
* Role-based access control (RBAC)
* Password hashing
* Basic HIPAA-style access logging

### 👤 Patient Portal

* Daily wellness goal tracker (steps, sleep, water intake, active minutes)
* Preventive care reminders
* Health tip of the day
* Edit profile (allergies, medications, medical info)

### 🩺 Provider Portal

* View assigned patients
* View each patient’s compliance and checkup reminders

### 📄 Public Health Information Page

* Static health articles and privacy policy

### ☁️ Deployment & CI/CD

* Frontend deployed on **Vercel**
* Backend deployed on **Render**
* Cloud database on **MongoDB Atlas**
* CI/CD via **GitHub Actions**

---

# 🏗️ **2. System Architecture**

```
                  ┌──────────────────────────────┐
                  │         Frontend (UI)        │
                  │       React / Next.js        │
                  │  · Patient Dashboard         │
                  │  · Provider Dashboard        │
                  │  · Profile Page              │
                  └───────────────┬──────────────┘
                                  │ HTTPS (REST API)
                                  ▼
     ┌─────────────────────────────────────────────────────┐
     │                  Backend API (Django)               │
     │                                                     │
     │  · Authentication (JWT)                             │
     │  · Patient Services                                 │
     │  · Provider Services                                │
     │  · Preventive Reminders                             │
     │  · Health Goals API                                 │
     │  · Logging (HIPAA-style)                            │
     └───────────────┬────────────────────────────────────┘
                     │
                     ▼
         ┌──────────────────────────────────┐
         │           MongoDB Atlas          │
         │   Collections:                   │
         │   · users                        │
         │   · goals                        │
         │   · preventive_reminders         │
         │   · provider_patients            │
         │   · logs                         │
         └──────────────────────────────────┘
```

---

# 🗄️ **3. Database Structure (MongoDB)**

### **users**

```json
{
  "_id": "ObjectId",
  "role": "patient | provider",
  "name": "David",
  "email": "david@gmail.com",
  "passwordHash": "...",
  "profile": {
    "allergies": ["dust"],
    "medications": ["metformin"],
    "conditions": ["diabetes"]
  },
  "providerAssigned": "providerUserId",
  "createdAt": "ISODate"
}
```

### **goals**

```json
{
  "patientId": "ObjectId",
  "date": "2025-12-04",
  "steps": { "target": 6000, "achieved": 3620 },
  "sleep": { "target": 7, "achieved": 6.5 },
  "waterIntake": { "target": 8, "achieved": 5 },
  "activeMinutes": { "target": 60, "achieved": 56 },
  "complianceStatus": "met | partial | missed"
}
```

### **preventive_reminders**

```json
{
  "patientId": "ObjectId",
  "title": "Annual Blood Test",
  "dueDate": "2025-12-20",
  "status": "upcoming | completed | missed"
}
```

### **provider_patients**

```json
{
  "providerId": "ObjectId",
  "patientId": "ObjectId"
}
```

### **logs**

```json
{
  "userId": "ObjectId",
  "action": "profile_view | login | goal_update",
  "timestamp": "ISODate"
}
```

---

# 🧠 **4. Approach to the Problem**

We followed a structured **MVP-first** development plan:

### **Step 1 — Requirement Analysis**

Identified core features: authentication, dashboards, profile, goals, reminders, logging, deployment.

### **Step 2 — Break Into Modules**

1. Auth module
2. Patient module
3. Provider module
4. Goal tracking module
5. Reminder module
6. Logging module

### **Step 3 — Architecture Design**

* React frontend
* Django REST backend
* MongoDB database

### **Step 4 — Team Parallel Development**

Each member handled a separate major domain (Design, Frontend, Backend, Integration/DevOps).

### **Step 5 — Integration**

Connected frontend → backend → database via REST APIs.

### **Step 6 — Deployment**

* Frontend → Vercel
* Backend → Render
* MongoDB → Atlas

---

# 👥 **5. Team Roles (4-Member Team Breakdown)**

## 🎨 **Team Member 1 — UI/UX Designer (Design Lead)**

### Responsibilities

* Design all screens (Login, Dashboard, Profile, Provider View)
* Create wireframes, mockups, and style guide
* Provide assets (icons, illustrations)
* Ensure responsive design readiness
* Collaborate with frontend developer

### Deliverables

* Figma/Canva designs
* UI assets (SVG/PNG)
* Style guide (colors, spacing, typography)

![Dashboard](src/assets/dashboard1.jpeg)
![Dashboard](src/assets/dashboard1.jpeg)

---

## 💻 **Team Member 2 — Frontend Developer (React/Next.js)**

### Responsibilities

* Convert designs into functional React/Next.js pages
* Build Login, Register, Patient Dashboard, Provider Dashboard, Profile page
* Integrate REST APIs via Axios
* Implement JWT handling, protected routes, role-based navigation
* Responsive UI (Tailwind CSS)
* Charts for wellness goals
* Client-side validation

### Deliverables

* Frontend source code
* API-integrated, responsive UI
* Clean component structure

---

## 🛠️ **Team Member 3 — Backend Developer (Django + MongoDB)**

### Responsibilities

* Set up Django REST Framework
* Build all REST API endpoints:

  * Authentication
  * Goals
  * Preventive reminders
  * Provider dashboard
  * Profile management
* Implement JWT authentication
* Role-based access middleware
* Create MongoDB models (users, goals, reminders, logs)
* Logging for sensitive operations
* Input validation using DRF serializers
* Error handling

### Deliverables

* Django backend
* REST API documentation
* Stable MongoDB models
* Secure JWT authentication

---

## 🔧 **Team Member 4 — Integration + Deployment Engineer**

### Responsibilities

#### **Backend ↔ Database Integration**

* Connect Django backend with MongoDB Atlas
* Manage DB URI and environment variables
* Validate CRUD operations

#### **Frontend ↔ Backend Integration**

* Connect React frontend with Django APIs
* Test complete user flows (Login → Dashboard → Profile → Provider view)
* Fix CORS & API response issues

#### **Deployment**

* Deploy frontend on Vercel
* Deploy backend on Render
* Configure environment variables securely
* Set up GitHub Actions CI/CD
* Monitor logs & pipeline failures
* Create Postman collection

### Deliverables

* Live deployed frontend and backend
* Fully integrated system
* CI/CD pipeline
* Postman API tests

---

# 🧩 **Summary Table**

| Team Member                 | Role                     | Main Work                       |
| --------------------------- | ------------------------ | ------------------------------- |
| **1. UI/UX Designer**       | Design                   | Wireframes, UI Screens, Mockups |
| **2. Frontend Developer**   | React/Next.js            | UI + API Integration            |
| **3. Backend Developer**    | Django + MongoDB         | REST APIs + Auth + DB Models    |
| **4. Integration & DevOps** | Integration + Deployment | FE ↔ BE ↔ DB + Deploy + CI/CD   |

---

# 🛠️ **6. Tech Stack**

### **Frontend**

* React / Next.js
* Tailwind CSS
* Axios

### **Backend (Python — Django)**

* Django
* Django REST Framework
* PyJWT
* Djongo / PyMongo
* Passlib (optional)
* DRF Serializers

### **Database**

* MongoDB Atlas

### **DevOps**

* Vercel (Frontend)
* Render / Azure / AWS (Backend)
* GitHub Actions
* Docker (optional)

---

# 🔌 **7. API Overview (Django)**

### **Auth**

```
POST /auth/register
POST /auth/login
```

### **Patient**

```
GET  /patient/dashboard
GET  /patient/reminders
POST /patient/goals
PUT  /patient/profile
```

### **Provider**

```
GET /provider/patients
GET /provider/patient/{id}
```

### **Logs**

```
GET /logs/me
```

---

# ⚙️ **8. Installation & Setup**

## **Backend (Django)**

```bash
git clone https://github.com/yourusername/healthcare-portal
cd backend
```

### Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Start Server (Correct Command)

```bash
python manage.py runserver
```

---

## **Frontend (Next.js)**

```bash
cd frontend
npm install
npm run dev
```

---

# ☁️ **9. Deployment**

### **Frontend → Vercel**

```
vercel deploy
```

### **Backend → Render / Azure / AWS**

* Add environment variables
* Use `gunicorn backend.wsgi`
* Deploy directly from GitHub

### **Database → MongoDB Atlas**

* Create cluster
* Add IP whitelist
* Use connection string in environment variables

---

# 📝 **10. License**

MIT License

