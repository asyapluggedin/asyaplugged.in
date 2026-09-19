function get_theme() {
  var saved = localStorage.getItem("theme");
  if (saved === "black") saved = "dark";
  set_theme(saved || "light");
}

function set_theme(mode) {
  if ("light" !== mode && "dark" !== mode) {
    mode = "light";
  }
  document.body.dataset.theme = mode;
  localStorage.setItem("theme", mode);
}

function toggle_theme() {
  var current_theme = localStorage.getItem("theme");
  var new_theme = current_theme === "light" ? "dark" : "light";
  set_theme(new_theme);
}

var btn = document.getElementsByClassName("toggle");
Array.from(btn).forEach(function (button) {
  button.addEventListener("click", toggle_theme);
});

// Initialize theme
get_theme();
