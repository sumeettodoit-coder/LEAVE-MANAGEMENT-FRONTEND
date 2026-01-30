import {
  getFirestore, collection, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const db = getFirestore();

// USERS COUNT
onSnapshot(collection(db, "users"), snap => {
  let emp = 0, mgr = 0;

  snap.forEach(d => {
    if (d.data().role === "employee") emp++;
    if (d.data().role === "manager") mgr++;
  });

  document.getElementById("totalEmployees").innerText = emp;
  document.getElementById("totalManagers").innerText = mgr;
});

// LEAVES COUNT
onSnapshot(collection(db, "leaves"), snap => {
  let approved = 0, pending = 0;

  snap.forEach(d => {
    d.data().status === "approved" ? approved++ : pending++;
  });

  document.getElementById("approvedLeaves").innerText = approved;
  document.getElementById("pendingLeaves").innerText = pending;
});


await addDoc(collection(db,"leaves"),{
  userId: auth.currentUser.uid,
  status: "pending",
  createdAt: serverTimestamp()
});


await updateDoc(doc(db,"leaves",leaveId),{ status:"approved" });
