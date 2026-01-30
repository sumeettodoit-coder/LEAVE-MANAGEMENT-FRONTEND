const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.getElementById("loginBtn").addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("Email & password required");
    return;
  }

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    console.log("AUTH UID:", cred.user.uid);

    if (!cred.user.emailVerified) {
      alert("Please verify your email");
      return;
    }

    const userRef = doc(db, "users", cred.user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      alert("User profile not found in database");
      return;
    }

    const data = snap.data();
    console.log("USER DATA:", data);

    const role = data.role;

    if (role === "employee") {
        location.href = "../employee/dashboard.html";
      }
      else if (role === "manager") {
        location.href = "../manager/dashboard.html";
      }
      else if (role === "admin") {
        location.href = "../admin/dashboard.html";
      }      
    else {
      alert("Invalid role assigned");
    }

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
});
