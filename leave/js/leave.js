
// ===== Firebase imports =====
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCiC6OqoNtGleLB0peJsIVCVoo0FFfx8UY",
  authDomain: "leaveflow-chat.firebaseapp.com",
  projectId: "leaveflow-chat"
}

import { app } from "./firebase.js"; // tumhara common firebase init

const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("applyBtn").addEventListener("click", async () => {

  const leaveType = document.getElementById("leaveType").value;
  const startDate = document.getElementById("startDate").value;
  const endDate   = document.getElementById("endDate").value;
  const reason    = document.getElementById("reason").value;

  if (!leaveType || !startDate || !endDate || !reason) {
    alert("All fields required");
    return;
  }

  const user = auth.currentUser;
  if (!user) return;

  // 🔹 get user info
  const snap = await getDoc(doc(db, "users", user.uid));
  const userData = snap.data();

  await addDoc(collection(db, "leaves"), {
    userId: user.uid,
    userName: userData.name,
    userRole: userData.role,
    leaveType,
    startDate,
    endDate,
    reason,
    status: "pending",
    createdAt: serverTimestamp()
  });

  alert("Leave applied successfully");
});



