let menu = document.querySelector(".menu-icon");
let spanOne = document.querySelector(".menu-icon span:first-child");
let spanTwo = document.querySelector(".menu-icon span:nth-child(2)");
let spanThree = document.querySelector(".menu-icon span:last-child");

menu.addEventListener("click", (e) => {
  menu.classList.toggle("open");
  if (menu.classList.contains("open")) {
    spanOne.style.cssText = "top: 0px; transform: rotate(45deg);";
    spanTwo.style.cssText = " opacity: 0;";
    spanThree.style.cssText = "top: 0px; transform: rotate(-45deg);";
  } else {
    spanOne.style.cssText = " top: 0px;";
    spanTwo.style.cssText = "  top: 15px;";
    spanThree.style.cssText = "  top: 30px;";
  }
});
