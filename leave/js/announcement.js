document.getElementById("postAnnouncement").onclick = async () => {
  const msg = prompt("Type announcement");
  if (!msg) return;

  await addDoc(collection(db, "notifications"), {
    title: "Important Announcement",
    message: msg,
    senderRole: "manager",
    forRole: "employee",
    createdAt: serverTimestamp()
  });

  alert("Notification sent to all employees");
};
onSnapshot(collection(db, "notifications"), snap => {
  snap.forEach(d => {
    const n = d.data();
    if (n.forRole === "employee") {
      console.log("🔔", n.message);
    }
  });
});
const bellBtn = document.getElementById("bellBtn");
const notifDropdown = document.getElementById("notifDropdown");

bellBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  notifDropdown.style.display =
    notifDropdown.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", () => {
  notifDropdown.style.display = "none";
});

document.addEventListener("click", e => {
  if (!e.target.closest(".notif-wrapper")) {
    dropdown.style.display = "none";
  }
});
document.getElementById("markAll").onclick = async () => {
  const snap = await getDocs(collection(db, "notifications"));

  snap.forEach(d => {
    updateDoc(doc(db, "notifications", d.id), { read: true });
  });
};

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const notifList = document.getElementById("notifList");
const notifCount = document.getElementById("notifCount");

const q = query(
  collection(db, "notifications"),
  orderBy("createdAt", "desc")
);

onSnapshot(q, snapshot => {
  notifList.innerHTML = "";
  let unread = 0;

  snapshot.forEach(d => {
    const n = d.data();
    if (!n.read) unread++;

    notifList.innerHTML += `
      <div class="notif-item">
        <strong>${n.title}</strong>
        <small>${n.senderRole}: ${n.message}</small><br>
        <small>Just now</small>
      </div>
    `;
  });

  notifCount.innerText = unread;
  notifCount.style.display = unread ? "block" : "none";
});
await addDoc(collection(db, "announcements"), {
  text,
  sender: "admin",
  createdAt: serverTimestamp()
});
onSnapshot(collection(db, "announcements"), snap => {
  // notification bell me show
});
