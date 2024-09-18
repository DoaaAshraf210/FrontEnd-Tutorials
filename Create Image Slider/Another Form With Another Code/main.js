let silderImages = Array.from(
    document.querySelectorAll(".slider-container img")
  ),
  sildeNumber = document.querySelector(".slide-number"),
  prevButton = document.querySelector(".prev"),
  nextButton = document.querySelector(".next"),
  indicators = document.querySelector(".indicators"),
  currentSilde = 10,
  numberOfImages = silderImages.length;

prevButton.onclick = prevSilde;
nextButton.onclick = nextSilde;

let ul = document.createElement("ul");
ul.id = "pagintaion-ul";
indicators.appendChild(ul);
for (let i = 1; i <= numberOfImages; i++) {
  let li = document.createElement("li");
  li.setAttribute("data-index", i);
  li.appendChild(document.createTextNode(i));
  ul.appendChild(li);
}
let lis = Array.from(
  document.querySelectorAll(".slider-controls .indicators ul li")
);
lis.forEach((li) => {
  li.onclick = function () {
    currentSilde = +this.getAttribute("data-index");
    console.log(currentSilde);
    checker();
  };
});

checker();
function nextSilde() {
  if (currentSilde === numberOfImages) {
    currentSilde = 1;
  } else {
    currentSilde++;
  }
  checker();
}
function prevSilde() {
  if (currentSilde === 1) {
    currentSilde = numberOfImages;
  } else {
    currentSilde--;
  }
  checker();
}
function checker() {
  removeActiveClass();
  sildeNumber.innerHTML = `Silde ${currentSilde} of ${numberOfImages}`;
  silderImages[currentSilde - 1].classList.add("active");
  lis[currentSilde - 1].classList.add("active");
}

function removeActiveClass() {
  silderImages.forEach((el) => {
    el.classList.remove("active");
  });

  lis.forEach((el) => {
    el.classList.remove("active");
  });
}
