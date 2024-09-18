let nav = document.querySelector("nav"),
  sapn = document.querySelector("nav span"),
  toggle = document.querySelector(".toggle");

toggle.onclick = function () {
  nav.classList.add("open");
};
sapn.onclick = function () {
  nav.classList.remove("open");
};

document.onkeyup = function (e) {
  if (e.key === "Escape") {
    nav.classList.remove("open");
  }
};
