function set_theme(mode) {
  "light" != mode &&
    "black" != mode &&
    "auto" != mode &&
    ((mode = "auto"), console.log("invalid theme mode: ".concat(mode))),
    (document.body.dataset.theme = mode),
    localStorage.setItem("theme", mode);
}
function get_theme() {
  var current_theme = localStorage.getItem("theme") || "auto";
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "auto" == current_theme
      ? set_theme("light")
      : "light" == current_theme
      ? set_theme("black")
      : set_theme("auto")
    : "auto" == current_theme
    ? set_theme("black")
    : "black" == current_theme
    ? set_theme("light")
    : set_theme("auto");
}
var btn = document.getElementsByClassName("toggle");
Array.from(btn).forEach(function (button) {
  button.addEventListener("click", get_theme);
});
