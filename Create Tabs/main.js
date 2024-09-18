let lis = Array.from(document.querySelectorAll("ul li")),
  contents = Array.from(document.querySelectorAll(".content > div"));
// console.log(lis);
// console.log(contents);

lis.forEach((li) => {
  li.addEventListener("click", (el) => {
    // console.log(event.currentTarget);
    lis.forEach((li) => {
      li.classList.remove("active");
    });
    el.currentTarget.classList.add("active");

    contents.forEach((content) => {
      content.style.display = "none";
    });

    document.getElementsByClassName(
      el.currentTarget.dataset.content
    )[0].style.display = "block";
  });
});
