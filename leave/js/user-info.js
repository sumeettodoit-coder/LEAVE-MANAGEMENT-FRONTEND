
// ================= FIREBASE =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ================= CONFIG =================
const firebaseConfig = {
  apiKey: "AIzaSyCiC6OqoNtGleLB0peJsIVCVoo0FFfx8UY",
  authDomain: "leaveflow-chat.firebaseapp.com",
  projectId: "leaveflow-chat"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ================= LOAD USER =================
onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const snap = await getDoc(doc(db, "users", user.uid));
  if (!snap.exists()) return;

  const data = snap.data();

  // Header update
  document.getElementById("userName").innerText = data.name;
  document.getElementById("userRole").innerText = data.role;

  // Avatar initials
  document.getElementById("avatar").innerText =
    data.name.split(" ").map(n => n[0]).join("").toUpperCase();
});
