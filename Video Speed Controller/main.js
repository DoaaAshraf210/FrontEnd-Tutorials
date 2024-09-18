let speed = document.querySelector(".speed"),
  speedBar = document.querySelector(".speed-bar"),
  video = document.querySelector("video");

function handleMove(e) {
  let y = e.pageY - this.offsetTop;
  let percent = y / this.offsetHeight;
  let min = 0.2;
  let max = 2.02;
  let barHeight = Math.round(percent * 100) + "%";
  let rate = percent * (max - min) + min;
  video.playbackRate = rate;
  speedBar.style.height = barHeight;
  speedBar.textContent = rate.toFixed(2) + "x";
}

speed.addEventListener("mousedown", handleMove);
