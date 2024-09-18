let anchors = document.querySelectorAll("a");
let span = document.createElement("span");
span.className = "highlight";
document.body.appendChild(span);
function highlightLink(e) {
  let linkCoords = this.getBoundingClientRect();

  span.style.width = `${linkCoords.width}px`;
  span.style.height = `${linkCoords.height}px`;
  span.style.transform = `translate(${linkCoords.left + window.scrollX}px,${
    linkCoords.top + window.scrollY
  }px)`;
}

anchors.forEach((a) => a.addEventListener("mouseenter", highlightLink));
