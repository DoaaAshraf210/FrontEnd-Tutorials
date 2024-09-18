const player = document.querySelector(".player"),
  video = document.querySelector(".player-video"),
  progressContainer = document.querySelector(".progress"),
  progress = document.querySelector(".progress-filled"),
  buttonsSkip = document.querySelectorAll("[data-skip]"),
  buttonPlay = document.querySelector(".toggle"),
  rangesInput = document.querySelectorAll(".player-slider"),
  fullScreen = document.querySelector(".full-screen");

function togglePlay() {
  video.paused ? video.play() : video.pause();
}
function updatePlayButton() {
  buttonPlay.innerHTML = video.paused ? "►" : "❚ ❚";
}
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdates() {
  video.setAttribute(this.name, this.value);
}
function handelProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progress.style.flexBasis = `${percent}%`;
}
function scrub(e) {
  video.currentTime = (e.offsetX / this.offsetWidth) * video.duration;
}

function openFullscreen() {
  if (player.requestFullscreen) {
    player.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    player.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    player.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

//--------------------------------------
video.addEventListener("click", togglePlay);
buttonPlay.addEventListener("click", togglePlay);

video.addEventListener("pause", updatePlayButton);
video.addEventListener("play", updatePlayButton);
buttonPlay.addEventListener("click", updatePlayButton);
buttonsSkip.forEach((button) => button.addEventListener("click", skip));

rangesInput.forEach((range) =>
  range.addEventListener("change", handleRangeUpdates)
);
rangesInput.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdates)
);

video.addEventListener("timeupdate", handelProgress);
progressContainer.addEventListener("click", scrub);

fullScreen.addEventListener("click", openFullscreen);
fullScreen.addEventListener("click", closeFullscreen);
