let countDown,
  timerDisplay = document.querySelector(".time-left"),
  endTimeContainer = document.querySelector(".end-time"),
  buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
  clearInterval(countDown);
  const startDate = Date.now();
  const endDate = startDate + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(endDate);

  countDown = setInterval(() => {
    const secondsLeft = Math.round((endDate - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countDown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const hours = Math.floor(seconds / 60 / 60);
  const minutes = Math.floor((seconds - hours * 60 * 60) / 60);
  const secondsLeft = seconds % 60;

  const html = `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
  document.title = html;
  timerDisplay.textContent = html;
}
function displayEndTime(timestamp) {
  const endTime = new Date(timestamp);
  const hour = endTime.getHours();
  const formatHour = hour > 12 ? hour - 12 : hour < 10 ? "0" + hour : "" + hour;
  const minutes = endTime.getMinutes();

  endTimeContainer.textContent = `Be Back At ${formatHour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}
function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}
buttons.forEach((button) => button.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const mins = document.querySelector("form input").value;
  timer(mins * 60);
  document.customForm.reset();
});
