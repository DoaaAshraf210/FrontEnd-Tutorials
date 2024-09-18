let inputs = document.querySelectorAll("input");

// window.onload = function () {
//   localStorage.setItem("spacing", 0);
//   localStorage.setItem("blur", 0);
//   localStorage.setItem("base", "#ffc600");
// };
function handleUpdate() {
  let suffix = this.dataset.sizing || "";
  document.documentElement.style.setProperty(
    `--${this.name}`,
    `${this.value}${suffix}`
  );
  if (this.name === "base") localStorage.setItem("base", this.value);
  if (this.name === "spacing") localStorage.setItem("spacing", this.value);
  if (this.name === "blur") localStorage.setItem("blur", this.value);
}

inputs.forEach((input) => input.addEventListener("change", handleUpdate));
inputs.forEach((input) => input.addEventListener("mousemove", handleUpdate));
//------------------localStorage---------------
if (localStorage.getItem("spacing")) {
  document.documentElement.style.setProperty(
    `--${"spacing"}`,
    `${localStorage.getItem("spacing")}px`
  );
  document.querySelector("input:first-of-type").value =
    localStorage.getItem("spacing");
}
if (localStorage.getItem("blur")) {
  document.documentElement.style.setProperty(
    `--${"blur"}`,
    `${localStorage.getItem("blur")}px`
  );

  document.getElementsByName("blur")[0].value = localStorage.getItem("blur");
}
if (localStorage.getItem("base")) {
  document.documentElement.style.setProperty(
    `--${"base"}`,
    `${localStorage.getItem("base")}`
  );
  document.querySelector("[type='color']").value = localStorage.getItem("base");
}
