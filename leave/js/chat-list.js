// import { db } from "./firebase.js";
// import {
//   collection, query, where, orderBy,
//   onSnapshot, addDoc, serverTimestamp,
//   doc, setDoc
// } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// export const firebaseConfig = {
//   apiKey: "AIzaSyCiC6OqoNtGleLB0peJsIVCVoo0FFfx8UY",
//   authDomain: "leaveflow-chat.firebaseapp.com",
//   projectId: "leaveflow-chat"
// };

// export function initChat(CURRENT_USER) {
//   const chatList = document.getElementById("chatList");
//   const messagesDiv = document.getElementById("messages");
//   const input = document.getElementById("msgInput");
//   const sendBtn = document.getElementById("sendBtn");

  let ACTIVE_CHAT_ID = null;

  // 🔹 Load chat list
//   const q = query(
//     collection(db, "chats"),
//     where("users", "array-contains", CURRENT_USER.id),
//     orderBy("updatedAt", "desc")
//   );

//   onSnapshot(q, snap => {
//     chatList.innerHTML = "";
//     snap.forEach(d => {
//       const chat = d.data();
//       const other = chat.users.find(u => u !== CURRENT_USER.id);

//       const div = document.createElement("div");
//       div.className = "chat-user";
//       div.innerHTML = `
//         <strong>${other}</strong>
//         <small>${chat.lastMessage || ""}</small>
//       `;
//       div.onclick = () => openChat(d.id);
//       chatList.appendChild(div);
//     });
//   });

//   function openChat(chatId) {
//     ACTIVE_CHAT_ID = chatId;
//     listenMessages(chatId);
//   }

//   function listenMessages(chatId) {
//     const q = query(
//       collection(db, "chats", chatId, "messages"),
//       orderBy("createdAt")
//     );

//     onSnapshot(q, snap => {
//       messagesDiv.innerHTML = "";
//       snap.forEach(d => {
//         const m = d.data();
//         const div = document.createElement("div");
//         div.className = m.senderId === CURRENT_USER.id ? "msg me" : "msg other";
//         div.innerText = m.text;
//         messagesDiv.appendChild(div);
//       });
//       messagesDiv.scrollTop = messagesDiv.scrollHeight;
//     });
//   }

//   sendBtn.onclick = async () => {
//     if (!ACTIVE_CHAT_ID) return;
//     const text = input.value.trim();
//     if (!text) return;

//     await addDoc(
//       collection(db, "chats", ACTIVE_CHAT_ID, "messages"),
//       {
//         senderId: CURRENT_USER.id,
//         text,
//         createdAt: serverTimestamp()
//       }
//     );

//     await setDoc(
//       doc(db, "chats", ACTIVE_CHAT_ID),
//       { lastMessage: text, updatedAt: serverTimestamp() },
//       { merge: true }
//     );

//     input.value = "";
//   };
// }

import { db, auth } from "./firebase.js";
import {
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const chatList = document.getElementById("chatList");

onSnapshot(collection(db, "users"), (snapshot) => {
  chatList.innerHTML = "";

  snapshot.forEach(docSnap => {
    if (docSnap.id === auth.currentUser.uid) return;

    const u = docSnap.data();

    chatList.innerHTML += `
      <div class="chat-user"
        onclick="openChat('${docSnap.id}', '${u.name}')">
        <strong>${u.name}</strong><br>
        <small>${u.role}</small>
      </div>
    `;
  });
});

window.openChat = (uid, name) => {
  localStorage.setItem("chatUserId", uid);
  document.getElementById("chatWith").innerText = name;
  loadMessages();
};
document.querySelector(".chat-header strong").innerText = name;

document.querySelector(".chat-header .avatar").innerText = name.charAt(0);
