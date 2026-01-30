// ===== PROFILE IMAGE UPLOAD =====
const upload = document.getElementById("uploadPhoto");
const img = document.getElementById("profileImg");

upload.addEventListener("change", () => {
  const file = upload.files[0];
  if (file) {
    img.src = URL.createObjectURL(file);
  }
});

// ===== EDIT PROFILE (SIMULATION) =====
// ===== EDIT MODE TOGGLE =====
const editBtn = document.getElementById("editToggle");
const profileCard = document.querySelector(".profile-card");

editBtn.addEventListener("click", () => {
  profileCard.classList.toggle("editing");

  editBtn.textContent = profileCard.classList.contains("editing")
    ? "💾"
    : "✏️";
});
