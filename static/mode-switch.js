function set_theme(mode) {
  if ("light" !== mode && "black" !== mode) {
    mode = "light"; // Set a default theme if an invalid mode is provided
    console.log("invalid theme mode: " + mode);
  }
  document.body.dataset.theme = mode;
  localStorage.setItem("theme", mode);
}

function toggle_theme() {
  var current_theme = localStorage.getItem("theme");
  var new_theme = current_theme === "light" ? "black" : "light";
  set_theme(new_theme);
}

var btn = document.getElementsByClassName("toggle");
Array.from(btn).forEach(function (button) {
  button.addEventListener("click", toggle_theme);
});

// Initialize theme
get_theme();
