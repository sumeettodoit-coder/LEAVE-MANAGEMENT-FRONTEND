// // ================= FIREBASE =================
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// import {
//   getFirestore,
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   onSnapshot,
//   serverTimestamp
// } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// // 🔁 apna firebaseConfig yahan paste karo
// const firebaseConfig = {
//   apiKey:  "AIzaSyCiC6OqoNtGleLB0peJsIVCVoo0FFfx8UY",
//   authDomain: "leaveflow-chat.firebaseapp.com",
//   projectId: "leaveflow-chat",
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// ================= CONFIG =================
// const chatId = "employee_1_manager_1";
// const currentUserId = "admin"; // employee | manager | admin

// const messagesRef = collection(db, "chats", chatId, "messages");

// ================= SEND MESSAGE =================
// const input = document.getElementById("msgInput");
// const sendBtn = document.getElementById("sendBtn");

// sendBtn.addEventListener("click", sendMessage);
// input.addEventListener("keydown", e => {
//   if (e.key === "Enter") sendMessage();
// });

// async function sendMessage() {
//   const text = input.value.trim();
//   if (!text) return;

  // 🔹 User message
  // await addDoc(messagesRef, {
  //   senderId: currentUserId,
  //   text,
  //   createdAt: serverTimestamp(),
  //   seenBy: [currentUserId]
  // });

  // input.value = "";


// }
// const messagesDiv = document.getElementById("messages");

// const q = query(messagesRef, orderBy("createdAt"));

// onSnapshot(q, snapshot => {
//   messagesDiv.innerHTML = "";

//   snapshot.forEach(doc => {
//     const msg = doc.data();
//     const div = document.createElement("div");

//     if (msg.senderId === currentUserId) {
//       div.className = "msg sent";        // RIGHT (blue)
//     } else {
//       div.className = "msg received";    // LEFT (green)
//     }

//     div.innerText = msg.text;
//     messagesDiv.appendChild(div);
//   });

//   messagesDiv.scrollTop = messagesDiv.scrollHeight;
// });

import { auth, db } from "./firebase.js";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  orderBy,
  serverTimestamp,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let currentUser;
let selectedUserId = null;
let unsubscribeMessages = null;

// ================= AUTH CHECK =================
auth.onAuthStateChanged(user => {
  if (!user) return location.href = "../auth/login.html";
  currentUser = user;
  loadUsers();
});

// ================= LOAD USERS =================
function loadUsers() {
  const q = query(collection(db, "users"), where("__name__", "!=", currentUser.uid));

  onSnapshot(q, snap => {
    chatList.innerHTML = "";

    snap.forEach(docu => {
      const u = docu.data();

      const div = document.createElement("div");
      div.className = "chat-user";
      div.dataset.id = docu.id;

      div.innerHTML = `
        <div class="avatar">${u.name.charAt(0)}</div>
        <div>
          <strong>${u.name}</strong><br>
          <small>${u.role}</small>
        </div>
      `;

      div.onclick = () => openChat(docu.id, u.name);
      chatList.appendChild(div);
    });
  });
}

// ================= OPEN CHAT =================
function openChat(userId, name) {
  selectedUserId = userId;

  document.querySelector(".chat-header strong").innerText = name;

  if (unsubscribeMessages) unsubscribeMessages();

  const chatId = [currentUser.uid, userId].sort().join("_");

  const msgsRef = collection(db, "chats", chatId, "messages");
  const q = query(msgsRef, orderBy("createdAt"));

  unsubscribeMessages = onSnapshot(q, snap => {
    messages.innerHTML = "";
    snap.forEach(d => {
      const m = d.data();
      const div = document.createElement("div");

      div.className = m.senderId === currentUser.uid ? "msg me" : "msg other";
      div.innerText = m.text;

      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    });
  });
}

// ================= SEND MESSAGE =================
sendBtn.onclick = async () => {
  const text = msgInput.value.trim();
  if (!text || !selectedUserId) return;

  const chatId = [currentUser.uid, selectedUserId].sort().join("_");

  await addDoc(collection(db, "chats", chatId, "messages"), {
    text,
    senderId: currentUser.uid,
    createdAt: serverTimestamp()
  });

  msgInput.value = "";
};

function canChat(currentRole, targetRole) {

  // ❌ Employee → Admin NOT allowed
  if (currentRole === "employee" && targetRole === "admin") {
    return false;
  }

  // ✅ sab baaki allowed
  return true;
}

chatUser.onclick = async () => {

  const targetUid = chatUser.dataset.uid;

  const targetSnap = await getDoc(doc(db, "users", targetUid));
  const targetRole = targetSnap.data().role;

  if (!canChat(currentUserRole, targetRole)) {
    alert("Employees cannot chat with Admin");
    return;
  }

  openChat(targetUid);
};
sendBtn.onclick = async () => {

  if (!canChat(currentUserRole, selectedUserRole)) {
    alert("You are not allowed to message this user");
    return;
  }

  await addDoc(collection(db, chatPath, "messages"), {
    text: msgInput.value,
    from: currentUid,
    to: selectedUid,
    createdAt: serverTimestamp()
  });

  msgInput.value = "";
};

