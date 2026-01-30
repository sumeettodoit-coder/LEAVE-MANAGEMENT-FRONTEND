// Select all approve buttons
document.querySelectorAll(".approve").forEach(btn => {

  // Click event
  btn.addEventListener("click", () => {

      // Get status cell
      const status = btn.closest("tr").querySelector(".status");

      // Update status
      status.textContent = "Approved";
      status.classList.remove("pending");
      status.classList.add("approved");
  });
});
