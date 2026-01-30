import { getAuth, onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const snap = await getDoc(doc(db, "users", user.uid));
  const data = snap.data();

  // Name & Role
  document.getElementById("userName").innerText = data.name;
  document.getElementById("userRole").innerText = data.role;

  // Avatar (JD)
  document.getElementById("userAvatar").innerText =
    data.name.split(" ").map(n => n[0]).join("");
});
