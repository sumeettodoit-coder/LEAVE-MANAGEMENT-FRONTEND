// ================= FIREBASE IMPORTS =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ================= FIREBASE CONFIG =================
const firebaseConfig = {
  apiKey: "AIzaSyCiC6OqoNtGleLB0peJsIVCVoo0FFfx8UY",
  authDomain: "leaveflow-chat.firebaseapp.com",
  projectId: "leaveflow-chat"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ================= CURRENT USER (MANAGER) =================
const CURRENT_USER = {
  id: "manager_1",
  role: "manager"
};

// ================= DOM =================
const messagesDiv = document.getElementById("messages");
const input = document.getElementById("msgInput");
const sendBtn = document.getElementById("sendBtn");

// ================= STATE =================
let CHAT_ID = null;
let OTHER_USER_ID = null;
let unsubscribeMessages = null;

// ================= OPEN CHAT =================
// 👉 jab manager employee ya admin pe click kare
window.openChat = async function (otherUserId) {
  OTHER_USER_ID = otherUserId;
  CHAT_ID = [CURRENT_USER.id, OTHER_USER_ID].sort().join("_");

  const chatDocRef = doc(db, "chats", CHAT_ID);

  // 🔹 ensure chat document exists
  await setDoc(
    chatDocRef,
    {
      users: [CURRENT_USER.id, OTHER_USER_ID],
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );

  listenMessages();
};

// ================= LISTEN MESSAGES =================
function listenMessages() {
  if (unsubscribeMessages) unsubscribeMessages();

  const messagesRef = collection(db, "chats", CHAT_ID, "messages");
  const q = query(messagesRef, orderBy("createdAt"));

  unsubscribeMessages = onSnapshot(q, snapshot => {
    messagesDiv.innerHTML = "";

    snapshot.forEach(docSnap => {
      const msg = docSnap.data();
      renderMessage(msg);
    });

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });
}

// ================= SEND MESSAGE =================
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const text = input.value.trim();
  if (!text || !CHAT_ID) return;

  const messagesRef = collection(db, "chats", CHAT_ID, "messages");
  const chatDocRef = doc(db, "chats", CHAT_ID);

  await addDoc(messagesRef, {
    senderId: CURRENT_USER.id,
    text,
    createdAt: serverTimestamp(),
    seenBy: [CURRENT_USER.id]
  });

  await setDoc(
    chatDocRef,
    {
      lastMessage: text,
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );

  input.value = "";
}

// ================= RENDER MESSAGE =================
function renderMessage(msg) {
  const div = document.createElement("div");

  if (msg.senderId === CURRENT_USER.id) {
    div.className = "msg sent";       // manager → right (blue)
  } else {
    div.className = "msg received";   // employee/admin → left (green)
  }

  div.innerText = msg.text;
  messagesDiv.appendChild(div);
}

/* ================= DEMO =================
   Page load pe ek chat open kar do
   (baad me sidebar click se call hoga)
*/
openChat("employee_1");
// openChat("admin_1");
