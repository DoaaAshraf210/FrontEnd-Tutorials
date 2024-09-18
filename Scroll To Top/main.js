let up = document.querySelector("span");

window.onscroll = function () {
  this.scrollY >= 700 ? up.classList.add("show") : up.classList.remove("show");
};
up.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
