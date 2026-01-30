// ========== FIREBASE ==========
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore, collection, addDoc,
  query, orderBy, onSnapshot,
  serverTimestamp, doc, setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCiC6OqoNtGleLB0peJsIVCVoo0FFfx8UY",
  authDomain: "leaveflow-chat.firebaseapp.com",
  projectId: "leaveflow-chat"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ========== CURRENT USER ==========
const CURRENT_USER = {
  id: "employee_1",
  role: "employee"
};

const MANAGER_ID = "manager_1";
const CHAT_ID = `${CURRENT_USER.id}_${MANAGER_ID}`;

// ========== DOM ==========
const messagesDiv = document.getElementById("messages");
const input = document.getElementById("msgInput");
const sendBtn = document.getElementById("sendBtn");

// ========== FIREBASE REFS ==========
const chatRef = doc(db, "chats", CHAT_ID);
const messagesRef = collection(db, "chats", CHAT_ID, "messages");

// ========== ENSURE CHAT EXISTS ==========
await setDoc(chatRef, {
  users: [CURRENT_USER.id, MANAGER_ID],
  updatedAt: serverTimestamp()
}, { merge: true });

// ========== SEND ==========
sendBtn.onclick = sendMessage;
input.addEventListener("keydown", e => e.key === "Enter" && sendMessage());

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  await addDoc(messagesRef, {
    senderId: CURRENT_USER.id,
    text,
    createdAt: serverTimestamp()
  });

  await setDoc(chatRef, {
    lastMessage: text,
    updatedAt: serverTimestamp()
  }, { merge: true });

  input.value = "";
}

// ========== RECEIVE ==========
const q = query(messagesRef, orderBy("createdAt"));

onSnapshot(q, snap => {
  messagesDiv.innerHTML = "";
  snap.forEach(d => render(d.data()));
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

function render(msg) {
  const div = document.createElement("div");
  div.className = msg.senderId === CURRENT_USER.id ? "msg sent" : "msg received";
  div.innerText = msg.text;
  messagesDiv.appendChild(div);
}
