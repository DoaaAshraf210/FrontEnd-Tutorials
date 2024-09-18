let btn = document.querySelector("button");
let span = document.createElement("span");
let spanText = document.createTextNode("My Awesome Tooltip");
btn.onmouseover = function () {
  span.appendChild(spanText);
  span.style.transition = "5s";
  btn.append(span);
};
btn.onmouseleave = function () {
  span.remove();
};
