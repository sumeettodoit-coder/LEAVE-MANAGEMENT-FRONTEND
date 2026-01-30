import {
  getFirestore,
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { app } from "./firebase.js";

const db = getFirestore(app);

onSnapshot(collection(db, "leaves"), (snap) => {
  let pending = 0, approved = 0;

  snap.forEach(d => {
    if (d.data().status === "pending") pending++;
    if (d.data().status === "approved") approved++;
  });

  document.getElementById("pendingCount").innerText = pending;
  document.getElementById("approvedCount").innerText = approved;
});
