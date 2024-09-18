const lis = document.querySelectorAll(".main-list > li");
const highlight = document.querySelector(".dropdownBackground");
const nav = document.querySelector("nav");

function handleLeave() {
  this.classList.remove("show-background", "show-text");
  highlight.classList.remove("open");
}
function handleEnter() {
  this.classList.add("show-background");
  setTimeout(() => {
    if (this.classList.contains("show-background"))
      this.classList.add("show-text");
  }, 150);
  highlight.classList.add("open");

  const dropdownCoords =
    this.querySelector(".dropdown").getBoundingClientRect();
  const navCoords = nav.getBoundingClientRect();

  const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width,
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left,
  };

  highlight.style.setProperty("width", `${coords.width}px`);
  highlight.style.setProperty("height", `${coords.height}px`);
  highlight.style.setProperty(
    "transform",
    `translate(${coords.left}px, ${coords.top}px)`
  );
}

lis.forEach((li) => li.addEventListener("mouseenter", handleEnter));
lis.forEach((li) => li.addEventListener("mouseleave", handleLeave));
