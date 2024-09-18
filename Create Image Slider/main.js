let sliderImages = Array.from(
    document.querySelectorAll(".slider-container img")
  ),
  slideNumber = document.querySelector(".slide-number"),
  prevButton = document.querySelector(".prev"),
  nextButton = document.querySelector(".next"),
  sliders = Array.from(document.querySelectorAll(".sliders img")),
  currentSlide = 1,
  numberOfImages = sliderImages.length;

prevButton.onclick = prevSlide;
nextButton.onclick = nextSlide;
document.addEventListener("click", (e) => {
  if (e.target.dataset.slide) {
    currentSlide = e.target.dataset.slide;
    checker();
  }
});

function nextSlide() {
  if (currentSlide === numberOfImages) {
    currentSlide = 1;
  } else {
    currentSlide++;
  }
  checker();
}
function prevSlide() {
  if (currentSlide === 1) {
    currentSlide = numberOfImages;
  } else {
    currentSlide--;
  }
  checker();
}

function removeActiveClass(arr) {
  arr.forEach((el) => {
    el.classList.remove("active");
  });
}
function checker() {
  removeActiveClass(sliderImages);
  removeActiveClass(sliders);
  sliders[currentSlide - 1].classList.add("active");
  sliderImages[currentSlide - 1].classList.add("active");
  slideNumber.innerHTML = `Slide ${currentSlide} of ${numberOfImages}`;
}
checker();
