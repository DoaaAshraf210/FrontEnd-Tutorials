let scrollElement = document.querySelector(".scroller");

let height =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;
window.addEventListener("scroll", () => {
  let scrolling = document.documentElement.scrollTop;
  scrollElement.style.width = `${(scrolling / height) * 100}%`;
});
