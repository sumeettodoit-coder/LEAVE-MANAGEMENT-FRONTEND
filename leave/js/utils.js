fetch("../partials/sidebar.html")
  .then(res => res.text())
  .then(data => document.getElementById("sidebar").innerHTML = data);

fetch("../partials/navbar.html")
  .then(res => res.text())
  .then(data => document.getElementById("navbar").innerHTML = data);

document.addEventListener("click", e => {
  if (e.target.id === "themeToggle") {
    document.body.classList.toggle("dark");
  }
});

function notify(msg) {
  alert(msg);
}
