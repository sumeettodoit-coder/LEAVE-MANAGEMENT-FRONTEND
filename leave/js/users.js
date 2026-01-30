import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCiC6OqoNtGleLB0peJsIVCVoo0FFfx8UY",
  authDomain: "leaveflow-chat.firebaseapp.com",
  projectId: "leaveflow-chat"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const tbody = document.getElementById("userTableBody");

// ================= LOAD USERS =================
const snap = await getDocs(collection(db, "users"));

snap.forEach(docSnap => {
  const u = docSnap.data();

  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>
      <strong>${u.name}</strong><br>
      <small>${u.email}</small>
    </td>
    <td>${u.department || "-"}</td>
    <td><span class="badge ${u.role}">${u.role}</span></td>
    <td>
      ${u.role !== "admin"
        ? `<button onclick="promote('${docSnap.id}','${u.role}')">Promote</button>`
        : "—"}
    </td>
  `;
  tbody.appendChild(tr);
});

// ================= PROMOTE =================
window.promote = async (uid, role) => {
  let newRole =
    role === "employee" ? "manager" :
    role === "manager" ? "admin" : role;

  await updateDoc(doc(db, "users", uid), { role: newRole });
  alert("Role updated!");
  location.reload();
};
