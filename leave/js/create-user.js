import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* 🔥 MAIN APP (ADMIN LOGGED IN) */
const firebaseConfig = {
  apiKey: "AIzaSyCiC6OqoNtGleLB0peJsIVCVoo0FFfx8UY",
  authDomain: "leaveflow-chat.firebaseapp.com",
  projectId: "leaveflow-chat"
};

const mainApp = initializeApp(firebaseConfig);
const db = getFirestore(mainApp);

/* 🔥 SECONDARY APP (FOR USER CREATION) */
const secondaryApp = initializeApp(firebaseConfig, "Secondary");
const secondaryAuth = getAuth(secondaryApp);

/* CREATE USER */
document.getElementById("createUserBtn").addEventListener("click", async () => {
  const name = document.getElementById("cuName").value.trim();
  const email = document.getElementById("cuEmail").value.trim();
  const password = document.getElementById("cuPassword").value.trim();
  const role = document.getElementById("cuRole").value;

  if (!name || !email || !password || !role) {
    alert("All fields required");
    return;
  }

  try {
    // 🔐 Create Auth User
    const cred = await createUserWithEmailAndPassword(
      secondaryAuth,
      email,
      password
    );

    // 📦 Save Firestore Profile
    await setDoc(doc(db, "users", cred.user.uid), {
      name,
      email,
      role,
      createdBy: "admin",
      status: "active",
      createdAt: serverTimestamp()
    });

    // 📧 Email Verification
    await sendEmailVerification(cred.user);

    alert(`User created successfully as ${role.toUpperCase()}`);

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
});
