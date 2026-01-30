// Abhi UI-only dashboard
console.log("Admin dashboard loaded");
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};
const modal = document.getElementById("announcementModal");

document.getElementById("openAnnouncementBtn").onclick = () => {
  modal.style.display = "flex";
};

document.getElementById("closeModal").onclick = () => {
  modal.style.display = "none";
};
import { getAuth, onAuthStateChanged } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { getFirestore, doc, getDoc } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, async user => {
  if (!user) {
    window.location.href = "/auth/login.html";
    return;
  }

  const snap = await getDoc(doc(db, "users", user.uid));
  const role = snap.data().role;

  // Example: employee page
  if (role !== "employee") {
    alert("Access denied");
    window.location.href = "/auth/login.html";
  }
});

// admin-promote.js
import { db } from "../firebase.js";
import {
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function promoteUser(uid, newRole) {
  await updateDoc(doc(db, "users", uid), {
    role: newRole
  });

  alert(`User promoted to ${newRole}`);
}
