let text = document.querySelector("h1");
let container = document.querySelector("div");
const shadowDimension = 100;
function shadow(e) {
  let { offsetWidth: w, offsetHeight: h } = container;
  let { offsetX: x, offsetY: y } = e;
  //(x ,y)
  // h1 x and y Relative to element
  // How long did you walk in this item?

  // e.target.offsetLeft
  //h1 x and y Relative to document
  // x and y begin from zero if found child in document
  if (this !== e.target) {
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }
  let shadowDimensionX = Math.round(
    (x / w) * shadowDimension - shadowDimension / 2
  );
  let shadowDimensionY = Math.round(
    (y / h) * shadowDimension - shadowDimension / 2
  );

  text.style.textShadow = `
      ${shadowDimensionX}px ${shadowDimensionY}px 0 rgba(255,0,255),
      ${shadowDimensionX * -1}px ${shadowDimensionY}px 0 rgba(0,255,255),
      ${shadowDimensionY}px ${shadowDimensionX * -1}px 0 rgba(0,255,0),
      ${shadowDimensionY * -1}px ${shadowDimensionX}px 0 rgba(0,0,255)
    `;
}
container.addEventListener("mousemove", shadow);
