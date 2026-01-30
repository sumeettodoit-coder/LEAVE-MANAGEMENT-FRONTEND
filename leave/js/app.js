// get existing pending count
let pending = localStorage.getItem("pendingLeaves");
if (!pending) {
  localStorage.setItem("pendingLeaves", 0);
}

// show on admin dashboard
const pendingEl = document.getElementById("pending");
if (pendingEl) {
  pendingEl.innerText = localStorage.getItem("pendingLeaves");
}

// apply leave
function applyLeave() {
  let count = parseInt(localStorage.getItem("pendingLeaves"));
  count += 1;
  localStorage.setItem("pendingLeaves", count);

  alert("Leave Applied Successfully!");
}



let rejectRow = null;

document.querySelectorAll(".reject").forEach(btn => {
  btn.onclick = () => {
    rejectRow = btn.closest("tr");
    document.getElementById("rejectModal").style.display = "flex";
  };
});

document.getElementById("cancelReject").onclick = () => {
  document.getElementById("rejectModal").style.display = "none";
};

document.getElementById("confirmReject").onclick = () => {
  if (rejectRow) {
    rejectRow.querySelector(".status").innerText = "Rejected";
    rejectRow.querySelector(".status").className = "status rejected";
    rejectRow.querySelector(".actions").innerHTML = "—";

    showToast("Leave Rejected");
  }
  document.getElementById("rejectModal").style.display = "none";
};


const searchInput = document.querySelector(".panel-top input");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    document.querySelectorAll("tbody tr").forEach(row => {
      row.style.display = row.innerText.toLowerCase().includes(value)
        ? ""
        : "none";
    });
  });
}
const bell = document.querySelector(".icon:nth-child(2)");
const box = document.getElementById("notificationBox");

if (bell) {
  bell.onclick = () => {
    box.style.display = box.style.display === "block" ? "none" : "block";
  };
}
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
}

