let section = document.querySelector(".skills");
let spans = document.querySelectorAll(".skill .the-prog span");
let progs = document.querySelectorAll(".skill .the-prog span:first-child");
window.onscroll = function () {
  if (window.scrollY >= section.offsetTop + 20) {
    spans.forEach((span) => {
      span.style.width = span.dataset.width;
    });
    progs.forEach((prog) => {
      let rate = prog.innerHTML;
      let val = +rate.replace("%", " ").trim();
      prog.style.left = val - 2 + "%";
    });
  }
};
