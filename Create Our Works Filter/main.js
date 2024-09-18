let lis = document.querySelectorAll("li"),
  imgs = Array.from(document.images);

lis.forEach((li) => {
  li.addEventListener("click", removeActiveClass);
  li.addEventListener("click", filtering);
});

function removeActiveClass() {
  lis.forEach((li) => {
    li.classList.remove("active");
    this.classList.add("active");
    li.style.background = "transparent";
    this.style.background = this.dataset.color;
  });
}

function filtering() {
  imgs.forEach((img) => {
    img.style.display = "none";
  });
  let imgsAfterFiltering = Array.from(
    document.getElementsByClassName(this.dataset.cat)
  );
  imgsAfterFiltering.forEach((img) => {
    img.style.display = "block";
  });
}
