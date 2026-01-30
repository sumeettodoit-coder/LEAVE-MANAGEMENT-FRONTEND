# LeaveFlow – Role-Based Leave Management System (Frontend)

LeaveFlow is a modern **frontend leave management system** built using **HTML, CSS, JavaScript, and Firebase**. It provides **role-based dashboards, real-time leave workflows, authentication, and chat**, designed for scalable organizational use.

This project demonstrates **real-world frontend architecture** with **Firebase as a backend-as-a-service**, focusing on clean UI, real-time updates, and access control.

---

## Features>>

### Authentication
- Firebase Email & Password authentication
- Email verification before login
- Secure role-based redirection
- Session persistence and automatic logout

### Role Management>>
- Three user roles:
  - **Employee** - Apply leaves, view balance, chat with Manager
  - **Manager** - Approve/reject leaves, team management, chat with Admin & Employees
  - **Admin** - Full control, role assignment, chat only with Managers
- Role stored and enforced via Firestore
- Protected routes based on authentication state

### Dashboards>>
- Separate dashboards for each role:
  - `/admin/admin-dashboard.html`
  - `/manager/dashboard.html`
  - `/employee/employee-dashboard.html`
- Dynamic UI based on user permissions
- Real-time statistics powered by Firestore
- Mood selector for employees
- Notification bell with real-time alerts

### Leave Management>>
- **Leave Types & Balance:**
  - General: 10 days
  - Medical: 5 days
  - Personal: 15 days
- Calendar-based date selection
- Leave balance tracking with low-balance warnings
- Employees and Managers can apply for leave
- Leave requests stored in Firestore
- **Status Flow:**
  - Pending → Approved/Rejected (with reason)
- Real-time approval and rejection updates
- Multi-level approval hierarchy

### Real-Time Chat>>
- Firebase Firestore powered chat system
- One-to-one personal messaging
- Profile photos displayed in chat
- **Role-based communication rules:**
  - Employee ↔ Manager ✓
  - Manager ↔ Admin ✓
  - Employee ↛ Admin (restricted)
- Real-time message updates
- Unread message indicators

### Live Statistics>>
- Total Employees count
- Total Managers count
- Approved Leaves count
- Pending Leaves count
- Data updates in real time without refresh
- Visual charts and analytics

---

## Tech Stack>>

| Component | Technology |
|-----------|------------|
| **Frontend** | HTML, CSS, JavaScript  |
| **Authentication** | Firebase Authentication (Email/Password) |
| **Database** | Cloud Firestore (Real-time ) |
| **Storage** | Firebase Storage (Profile Photos) |
| **Hosting** | Firebase Hosting (Optional) |

---

## Project Structure>>
LeaveFlow-Frontend/
├── admin/                      # Admin role pages
│   ├── admin-dashboard.html    # Admin dashboard with stats
│   ├── announcements.html      # Post system announcements
│   ├── assign-roles.html       # Role management interface
│   ├── manage-leaves.html      # Approve/reject all leaves
│   ├── messages-admin.html     # Chat with Managers only
│   └── scan.html               # QR/Scanner feature
├── manager/                    # Manager role pages
│   ├── dashboard.html          # Manager dashboard
│   ├── manager-profile.html    # Profile edit with photo
│   ├── messages-manager.html   # Chat with Employees & Admin
│   ├── new-leave-manager.html  # Apply leave for self
│   └── team.html               # View team members
├── employee/                   # Employee role pages
│   ├── employee-dashboard.html # Employee dashboard
│   ├── calendar.html           # Calendar-based leave selection
│   ├── messages-employee.html  # Chat with Manager only
│   ├── new-leave-emp.html      # Apply leave form
│   ├── profile-employee.html   # Profile & photo upload
│   └── mood-selector.html      # Daily mood tracking
├── auth/                       # Public authentication pages
│   ├── login.html
│   ├── register.html
│   └── forgot-password.html
├── css/                        # Stylesheets
│   ├── admin-dashboard.css
│   ├── dashboard.css
│   ├── login.css
│   ├── employee-dashboard.css
│   ├── forms.css
│   └── utils.css
├── js/                         # JavaScript modules
│   ├── firebase-config.js      # Firebase initialization
│   ├── auth.js                 # Login/Signup/Logout logic
│   ├── leaves.js               # Leave CRUD operations
│   ├── chat.js                 # Real-time messaging
│   ├── notifications.js        # Bell icon & alerts system
│   ├── dashboard-stats.js      # Statistics and charts
│   └── utils.js                # Helper functions
├── images/                     # Static assets
│   ├── profile-photos/         # User uploaded avatars
│   └── icons/                  # UI icons
└── index.html                  # Landing page
Copy

---

## Authentication Flow>>

1. User signs up and selects role (Employee/Manager/Admin)
2. Account is created in Firebase Authentication
3. User profile (name, email, role, photoURL) is stored in Firestore `users` collection
4. Verification email is sent to user's email address
5. User must verify email before login (enforced check)
6. On login, role is fetched from Firestore document
7. User is redirected to the correct dashboard based on role:
   - `role: 'employee'` → `/employee/employee-dashboard.html`
   - `role: 'manager'` → `/manager/dashboard.html`
   - `role: 'admin'` → `/admin/admin-dashboard.html`

---

## Leave Workflow>>

1. **Application:** Employee or Manager applies for leave via calendar interface
   - Select leave type (General/Medical/Personal)
   - Select date range
   - System checks available balance
   - Submit creates Firestore document with `status: "pending"`

2. **Manager Review:** Manager views team's pending leaves
   - Can approve or reject with reason
   - Updates status in Firestore

3. **Admin Review:** Admin views all leaves in organization
   - Can override Manager decisions
   - Final approval authority

4. **Status Updates:** 
   - Real-time status changes via Firestore `onSnapshot`
   - Notifications sent to employee
   - Leave balance auto-updates on approval

5. **Rejection:** 
   - Requires mandatory reason
   - Employee receives notification with reason
   - Leave balance restored

6. **Real-time Sync:** 
   - All dashboard statistics update instantly
   - No page refresh required

---

## Setup & Installation
### 🛠️ Prerequisites
- ✉️ **Firebase Account** (Free Spark Plan)
- 🌐 **Modern web browser** (Chrome/Firefox/Edge)
- 💻 **VS Code** with Live Server extension (Recommended)

---

### 📥 Step 1: Clone Repository
``bash
git clone https://github.com/yourusername/LeaveFlow-Frontend.git
cd LeaveFlow-Frontend``
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

###   Step 2: Firebase Configuration
🚀 Go to Firebase Console
➕ Create a new project
🔐 Enable Authentication → Sign-in method → Email/Password
💾 Create Cloud Firestore database (Start in test mode for development)
🖼️ Enable Storage for profile photos
⚙️ Register web app and copy Firebase configuration

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

⚙️ Step 3: Create Config File
📁 Create file: js/firebase-config.js

JavaScript
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 Step 4: Firebase Security Rules
🛡️ Update your Firestore Security Rules:
JavaScript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() {
      return request.auth != null;
    }
  
    function getUserRole() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role;
    }
    
    function isAdmin() {
      return isAuthenticated() && getUserRole() == 'admin';
    }
    
    function isManager() {
      return isAuthenticated() && getUserRole() == 'manager';
    }

    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isAdmin() || (request.auth.uid == userId && request.resource.data.role == resource.data.role);
      allow delete: if isAdmin();
    }

    match /leaves/{leaveId} {
      allow read: if isAuthenticated() && (
        resource.data.employeeId == request.auth.uid || 
        getUserRole() == 'admin' || 
        (getUserRole() == 'manager' && resource.data.employeeId != request.auth.uid)
      );
      allow create: if isAuthenticated();
      allow update: if isAdmin() || (isManager() && resource.data.status == 'pending');
      allow delete: if isAdmin();
    }

    match /messages/{messageId} {
      allow read: if isAuthenticated() && (
        resource.data.sender == request.auth.uid || 
        resource.data.receiver == request.auth.uid
      );
      allow create: if isAuthenticated();
    }
  }
}

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Step 5: Run Locally
🖥️ Open with Live Server (VS Code Extension) OR:
bash
# Using Python 3
python -m http.server 5500

# Using Node.js
npx serve .
🌐 Access at: http://localhost:5500

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 Step 6: Create First Admin
📝 Register via UI (creates as Employee by default)
    Go to Firebase Console → Firestore Database
👤 Find your user in users collection
✏️ Change role field from employee to admin
🔄 Refresh browser → Access Admin panel

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Usage Guide
👨‍💼 Employee Workflow
🔐 Login → 📊 Dashboard → 📝 Apply Leave (Select Type & Dates) → ✅ Submit 
    ↓
📧 Wait for Approval → 🔔 Receive Notification → 💬 Chat with Manager (if needed)
👩‍💼 Manager Workflow

-------------------------------------------------------------------------------------------------------------------------------------------------------------------
🔐 Login → 📊 Dashboard → 👀 Review Team Requests → ✅ Approve/Reject with Reason 
    ↓
📢 Post Announcements → 📝 Apply Own Leave → 💬 Chat with Team/Admin
🛡️ Admin Workflow
Copy
🔐 Login → 📊 Dashboard → 🎭 Assign Roles to Users → 📋 Manage All Leaves 
    ↓
📢 Post Global Announcements → 💬 Chat with Managers Only → 📈 View System Stats
⚡ Key Functionalities
🏖️ Leave Balance Management
✅ Automatic deduction on approval
🔄 Restoration on rejection
⚠️ Warnings when balance < 2 days
📅 Yearly reset (configurable)

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

💬 Chat System
⚡ Real-time messaging using onSnapshot
🖼️ Profile photos from Firebase Storage
🕐 Message timestamps
✓ Read receipts implementation

>>>
🔔 Notifications
🔔 Bell icon in header
🔢 Real-time badge count
👆 Click to mark as read
🗑️ Auto-dismiss after 30 days
>>>
Deployment
🔥 Firebase Hosting (Recommended)
  bash
  Copy
  # Install Firebase CLI
  npm install -g firebase-tools

  # Login to Firebase
  firebase login

  # Initialize Hosting
  firebase init hosting
  # Deploy
  firebase deploy
>>>
