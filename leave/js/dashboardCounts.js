import {
  getFirestore,
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { app } from "./firebase.js";

const db = getFirestore(app);

const empCount = document.getElementById("empCount");
const mgrCount = document.getElementById("mgrCount");
const approvedCount = document.getElementById("approvedCount");
const pendingCount = document.getElementById("pendingCount");

// USERS COUNT
onSnapshot(collection(db, "users"), (snap) => {
  let emp = 0, mgr = 0;

  snap.forEach(d => {
    if (d.data().role === "employee") emp++;
    if (d.data().role === "manager") mgr++;
  });

  empCount.innerText = emp;
  mgrCount.innerText = mgr;
});

// LEAVES COUNT
onSnapshot(collection(db, "leaves"), (snap) => {
  let approved = 0, pending = 0;

  snap.forEach(d => {
    if (d.data().status === "approved") approved++;
    if (d.data().status === "pending") pending++;
  });

  approvedCount.innerText = approved;
  pendingCount.innerText = pending;
});
