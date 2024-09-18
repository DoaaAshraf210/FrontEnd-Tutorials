let endDate = new Date("Sep 12,2026 02:58:00").getTime();

let counter = setInterval(() => {
  let startDate = new Date().getTime();
  let date = endDate - startDate;
  let days = Math.round(date / (1000 * 60 * 60 * 24));
  let hours = Math.round((date % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.round((date % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.round((date % (1000 * 60)) / 1000);

  setValueInElement(
    ".days",
    days < 10 ? `00${days}` : days < 100 ? `0${days}` : days
  );
  setValueInElement(".hours", hours < 10 ? `0${hours}` : hours);
  setValueInElement(".minutes", minutes < 10 ? `0${minutes}` : minutes);
  setValueInElement(".seconds", seconds < 10 ? `0${seconds}` : seconds);

  if (date <= 0) {
    clearInterval(counter);
    document.querySelector(".popup").style.transform = " scale(1.5)";
  }
}, 1000);

function setValueInElement(tp, val) {
  document.querySelector(`.events ${tp}`).innerHTML = val;
}
