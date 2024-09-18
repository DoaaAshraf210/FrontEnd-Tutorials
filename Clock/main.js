let hourHand = document.querySelector(".hour-hand"),
  mintHand = document.querySelector(".mints-hand"),
  secHand = document.querySelector(".sec-hand");

function setDate() {
  let date = new Date();
  date.g;
  let secsDegree = (date.getSeconds() / 60) * 360 + 90;
  let mintsDegree = (date.getMinutes() / 60) * 360 + 90;
  let hoursDegree = (date.getHours() / 12) * 360 + 90;
  secHand.style.transform = `rotate(${secsDegree}deg)`;
  mintHand.style.transform = `rotate(${mintsDegree}deg)`;
  hourHand.style.transform = `rotate(${hoursDegree}deg)`;
}

setInterval(setDate, 1000);
