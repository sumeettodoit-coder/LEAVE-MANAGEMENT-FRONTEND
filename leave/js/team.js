// ===== VIEW BUTTON =====
document.querySelectorAll(".btn.view").forEach(btn => {
  btn.onclick = () => {
    alert("View member details (UI simulation)");
  };
});

// ===== CHAT BUTTON =====
document.querySelectorAll(".btn.chat").forEach(btn => {
  btn.onclick = () => {
    alert("Open chat (UI simulation)");
  };
});
