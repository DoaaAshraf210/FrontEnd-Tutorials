let input = document.querySelector("input"),
  progress = document.querySelector(".progress"),
  count = document.querySelector(".count"),
  maxLength = input.getAttribute("maxLength");
// console.log(maxLength);
count.innerHTML = maxLength;

input.oninput = function () {
  count.innerHTML = maxLength - this.value.length;
  count.innerHTML == 0
    ? count.classList.add("zero")
    : count.classList.remove("zero");

  progress.style.width = `${(this.value.length / maxLength) * 100}%`;
  if (progress.style.width === "100%") {
    progress.style.borderRadius = "0";
  }
};
