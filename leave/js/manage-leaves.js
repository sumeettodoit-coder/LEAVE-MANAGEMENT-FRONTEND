import {
  getFirestore,
  collection,
  onSnapshot,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { app } from "./firebase.js";

const db = getFirestore(app);
const auth = getAuth(app);

const tableBody = document.getElementById("leaveTableBody");

onSnapshot(collection(db, "leaves"), (snapshot) => {
  tableBody.innerHTML = "";

  snapshot.forEach((snap) => {
    const d = snap.data();

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        <strong>${d.userName}</strong><br>
        <small>${d.userRole.toUpperCase()}</small>
      </td>
      <td>${d.leaveType}</td>
      <td>${d.duration}</td>
      <td>
        <span class="badge ${d.status}">
          ${d.status}
        </span>
      </td>
      <td>
        ${
          d.status === "pending"
            ? `
          <button onclick="approveLeave('${snap.id}')">✔</button>
          <button onclick="rejectLeave('${snap.id}')">✖</button>
        `
            : "—"
        }
      </td>
    `;

    tableBody.appendChild(tr);
  });
});
window.approveLeave = async (id) => {
  await updateDoc(doc(db, "leaves", id), {
    status: "approved"
  });
};

window.rejectLeave = async (id) => {
  const reason = prompt("Reject reason");
  if (!reason) return;

  await updateDoc(doc(db, "leaves", id), {
    status: "rejected",
    rejectReason: reason
  });
};
