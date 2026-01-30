# LeaveFlow – Role-Based Leave Management System (Frontend)

LeaveFlow is a modern **frontend leave management system** built using **HTML, CSS, JavaScript, and Firebase**.  
It provides **role-based dashboards, real-time leave workflows, authentication, and chat**, designed for scalable organizational use.

This project demonstrates **real-world frontend architecture** with **Firebase as a backend-as-a-service**, focusing on clean UI, real-time updates, and access control.

---

## Features

### Authentication
- Firebase Email & Password authentication
- Email verification before login
- Secure role-based redirection

### Role Management
- Three user roles:
  - **Employee**
  - **Manager**
  - **Admin**
- Role stored and enforced via Firestore

### Dashboards
- Separate dashboards for each role
- Dynamic UI based on user permissions
- Real-time statistics powered by Firestore

### Leave Management
- Employees and Managers can apply for leave
- Leave requests stored in Firestore
- Status flow:
  - Pending
  - Approved
  - Rejected (with reason)
- Real-time approval and rejection updates

### Real-Time Chat
- Firebase Firestore powered chat system
- Role-based communication rules:
  - Employee ↔ Manager
  - Manager ↔ Admin
  - Employee ↛ Admin (restricted)

### Live Statistics
- Total Employees
- Total Managers
- Approved Leaves
- Pending Leaves
- Data updates in real time without refresh

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Firebase
  - Authentication
  - Firestore (real-time database)

---

## Authentication Flow

1. User signs up and selects role
2. Account is created in Firebase Authentication
3. User profile is stored in Firestore
4. Verification email is sent
5. User must verify email before login
6. On login, role is fetched from Firestore
7. User is redirected to the correct dashboard

---

## Leave Workflow

1. Employee or Manager applies for leave
2. Leave is stored with `Pending` status
3. Manager reviews employee leave requests
4. Admin reviews all leave requests
5. Leave can be approved or rejected
6. Rejection requires a reason
7. Status updates reflect in real time

---

