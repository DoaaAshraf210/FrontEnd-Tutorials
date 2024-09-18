const sliderImages = document.querySelectorAll("img");

function checkSlide(e) {
  sliderImages.forEach((img) => {
    let halfHeightOfSlide =
      window.scrollY + window.innerHeight - img.height / 2;

    let imgBottom = img.offsetTop + img.height;

    let isHalfShown = halfHeightOfSlide > img.offsetTop;
    let isNotScrolledPast = window.scrollY < imgBottom - img.height / 3;

    if (isHalfShown && isNotScrolledPast) {
      img.classList.add("active");
    } else {
      img.classList.remove("active");
    }
  });
}
window.addEventListener("scroll", checkSlide);
