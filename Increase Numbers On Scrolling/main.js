let section = document.querySelector(".stats"),
  elements = document.querySelectorAll(".stats .number"),
  started = false; //function not excuted

window.onscroll = function () {
  elements.forEach((element) => {
    if (window.scrollY >= section.offsetTop - 100) {
      // if (element.textContent !== element.dataset.goal) {
      //   counterIncreasing(element);
      // } else {
      //   clearInterval(count);
      // }
      if (!started) {
        counterIncreasing(element);
      } else {
        started = true;
      }
    }
  });
};
function counterIncreasing(el) {
  let goal = el.dataset.goal;
  let count = setInterval(function () {
    el.textContent++;
    if (el.textContent === goal) {
      clearInterval(count);
    }
  }, 2000 / goal);
}
