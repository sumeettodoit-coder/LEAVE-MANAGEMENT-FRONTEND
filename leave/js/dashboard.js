// ===== MOOD SELECTION =====
const moods = document.querySelectorAll(".mood");
const commentBox = document.querySelector(".mood-comment");
const saveBtn = document.querySelector(".save-mood");

moods.forEach(mood => {
  mood.addEventListener("click", () => {
    // Show comment area when emoji selected
    commentBox.classList.remove("hidden");
  });
});

saveBtn.addEventListener("click", () => {
  alert("Mood & comment saved (frontend simulation)");
  commentBox.classList.add("hidden");
});

// ===== CALENDAR CLICK =====
document.querySelectorAll(".calendar-grid span").forEach(day => {
  day.addEventListener("click", () => {
    document.querySelectorAll(".calendar-grid span")
      .forEach(d => d.classList.remove("today"));
    day.classList.add("today");
  });
});


console.log("Dashboard JS loaded");

const leaves = [
  {
    employee: "Alice Johnson",
    type: "Medical",
    duration: "3 days (2024-03-20)",
    reason: "Severe flu and fever",
    status: "Pending"
  },
  {
    employee: "Bob Smith",
    type: "General",
    duration: "2 days (2024-03-25)",
    reason: "Family function",
    status: "Pending"
  },
  {
    employee: "Charlie Brown",
    type: "Personal",
    duration: "1 day (2024-03-15)",
    reason: "Approved"
  }
];

/************************************************
 * MANAGER DASHBOARD – FINAL CLEAN VERSION
 * Frontend only (localStorage = fake backend)
 ************************************************/

document.addEventListener("DOMContentLoaded", () => {
  setupApprovalToggle();
  bindActionButtons();
  restoreSavedStatuses();
});

function setupApprovalToggle() {
  const toggle = document.getElementById("approvalToggle");

  if (!toggle) {
    console.log("approvalToggle NOT FOUND");
    return;
  }

  console.log("approvalToggle FOUND");

  // Default OFF
  disableActions();

  if (localStorage.getItem("approvalEnabled") === "true") {
    toggle.checked = true;
    enableActions();
  }

  toggle.addEventListener("change", () => {
    console.log("Approval Toggle:", toggle.checked);

    if (toggle.checked) {
      enableActions();
      localStorage.setItem("approvalEnabled", "true");
    } else {
      disableActions();
      localStorage.setItem("approvalEnabled", "false");
    }
  });
}



function changeStatus(btn, status) {
  const row = btn.closest("tr");
  if (!row) return;

  const leaveId = row.dataset.id;
  const statusEl = row.querySelector(".status");
  const actionsEl = row.querySelector(".actions");

  if (!statusEl || !actionsEl) return;

  if (!confirm(`Are you sure you want to ${status}?`)) return;

  /* UI UPDATE */
  statusEl.innerText = status;
  statusEl.classList.remove("yellow", "green");
  statusEl.classList.add(status === "Approved" ? "green" : "yellow");
  actionsEl.innerHTML = "—";

  /* SAVE DECISION (Employee will see this) */
  localStorage.setItem(
    `leave_status_${leaveId}`,
    JSON.stringify({
      status: status,
      decidedBy: "Manager",
      decidedAt: new Date().toLocaleString()
    })
  );
}

/* ================================
   RESTORE SAVED STATUS (ON LOAD)
================================ */

function restoreSavedStatuses() {
  document.querySelectorAll("tr[data-id]").forEach(row => {
    const leaveId = row.dataset.id;
    const saved = localStorage.getItem(`leave_status_${leaveId}`);

    if (!saved) return;

    const data = JSON.parse(saved);
    const statusEl = row.querySelector(".status");
    const actionsEl = row.querySelector(".actions");

    if (!statusEl || !actionsEl) return;

    statusEl.innerText = data.status;
    statusEl.classList.remove("yellow", "green");
    statusEl.classList.add(data.status === "Approved" ? "green" : "yellow");
    actionsEl.innerHTML = "—";
  });
}

/* ================================
   DARK MODE TOGGLE (RESTORED)
================================ */

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const icon = themeToggle?.querySelector("i");

  if (!themeToggle || !icon) return;

  // Restore theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    icon.className = "fa-regular fa-sun";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      icon.className = "fa-regular fa-sun";
    } else {
      localStorage.setItem("theme", "light");
      icon.className = "fa-regular fa-moon";
    }
  });
});


function disableActions() {
  document.querySelectorAll("tr[data-id]").forEach(row => {
    // sirf pending wale disable honge
    if (row.querySelector(".status")?.innerText === "Pending") {
      row.querySelector(".actions")?.classList.add("disabled");
    }
  });
}

function enableActions() {
  document.querySelectorAll("tr[data-id]").forEach(row => {
    row.querySelector(".actions")?.classList.remove("disabled");
  });
}

function changeStatus(btn, status) {
  const row = btn.closest("tr");
  const leaveId = row.dataset.id;

  const statusEl = row.querySelector(".status");
  const actionsEl = row.querySelector(".actions");

  if (!confirm(`Are you sure you want to ${status}?`)) return;

  // UI update
  statusEl.innerText = status;
  statusEl.classList.remove("yellow", "green");
  statusEl.classList.add(status === "Approved" ? "green" : "yellow");

  // permanently disable after decision
  actionsEl.innerHTML = "—";
  actionsEl.classList.remove("disabled");

  // save decision
  localStorage.setItem(
    `leave_status_${leaveId}`,
    JSON.stringify({
      status,
      decidedBy: "Manager",
      decidedAt: new Date().toLocaleString()
    })
  );
}

// ================================
// APPROVE / REJECT (FINAL FIX)
// ================================

document.addEventListener("click", function (e) {
  const approveBtn = e.target.closest(".approve");
  const rejectBtn = e.target.closest(".reject");

  if (approveBtn) {
    handleDecision(approveBtn, "Approved");
  }

  if (rejectBtn) {
    handleDecision(rejectBtn, "Rejected");
  }
});

function handleDecision(btn, status) {
  const row = btn.closest("tr");
  if (!row) return;

  const statusEl = row.querySelector(".status");
  const actionsEl = row.querySelector(".actions");

  if (!statusEl || !actionsEl) return;

  if (!confirm(`Are you sure you want to ${status}?`)) return;

  statusEl.innerText = status;
  statusEl.classList.remove("yellow", "green");
  statusEl.classList.add(status === "Approved" ? "green" : "yellow");

  actionsEl.innerHTML = "—";
}

console.log("Dashboard JS loaded");

// 🔥 GLOBAL CLICK LISTENER
document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("approve")) {
    applyDecision(e.target, "Approved");
  }

  if (e.target.classList.contains("reject")) {
    applyDecision(e.target, "Rejected");
  }
});

function applyDecision(btn, status) {
  const row = btn.closest("tr");
  if (!row) return;

  // 🔥 SAFE COLUMN BASED SELECT
const statusEl = row.children[4];   // 4th column = Status
const actionsEl = row.children[5];  // 5th column = Actions

  if (!statusEl || !actionsEl) {
    alert("status/actions missing");
    return;
  }

  // STATUS CHANGE
  statusEl.innerText = status;
  statusEl.classList.remove("yellow", "green");
  statusEl.classList.add(status === "Approved" ? "green" : "yellow");

  // ACTIONS REMOVE
  actionsEl.innerHTML =renderActions(status);
}

document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("action-btn")) {

    // same row ke andar se active hatao
    const row = e.target.closest("tr");
    row.querySelectorAll(".action-btn")
       .forEach(btn => btn.classList.remove("active"));

    // clicked icon pe underline
    e.target.classList.add("active");
  }
});

import { getAuth, onAuthStateChanged } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { getFirestore, doc, getDoc } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, async user => {
  if (!user) {
    window.location.href = "/auth/login.html";
    return;
  }

  const snap = await getDoc(doc(db, "users", user.uid));
  const role = snap.data().role;

  // Example: employee page
  if (role !== "employee") {
    alert("Access denied");
    window.location.href = "/auth/login.html";
  }
});

import { auth, db } from "../firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) location.href = "../auth/login.html";

  const snap = await getDoc(doc(db, "users", user.uid));
  if (snap.data().role !== "admin") {
    alert("Access denied");
    location.href = "../auth/login.html";
  }
});
