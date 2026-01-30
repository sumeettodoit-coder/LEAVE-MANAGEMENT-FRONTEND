import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCiC6OqoNtGleLB0peJsIVCVoo0FFfx8UY",
  authDomain: "leaveflow-chat.firebaseapp.com",
  projectId: "leaveflow-chat"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const MANAGER_ID = "manager_1";
const box = document.getElementById("requests");

const q = query(
  collection(db, "leave_requests"),
  where("managerId", "==", MANAGER_ID)
);

onSnapshot(q, snap => {
  box.innerHTML = "";

  snap.forEach(docu => {
    const d = docu.data();
    box.innerHTML += `
      <div class="request">
        <strong>${d.employeeName}</strong><br>
        ${d.type} | ${d.startDate} → ${d.endDate}<br>
        Reason: ${d.reason}<br>
        Status: <b>${d.status}</b><br>

        ${d.status === "pending" ? `
          <button onclick="approve('${docu.id}')">Approve</button>
          <button onclick="reject('${docu.id}')">Reject</button>
        ` : ""}
      </div>
    `;
  });
});

window.approve = async id => {
  await updateDoc(doc(db, "leave_requests", id), {
    status: "approved"
  });
};

window.reject = async id => {
  await updateDoc(doc(db, "leave_requests", id), {
    status: "rejected"
  });
};
