let input = document.querySelector(".get-repos input"),
  button = document.querySelector(".get-repos button"),
  dataShow = document.querySelector(".show-data");

button.onclick = function () {
  getRepos();
};

function getRepos() {
  if (input.value === "") {
    dataShow.innerHTML =
      "<span style='color:#F44336'>Please Write Github Username.</span>";
  } else {
    dataShow.innerHTML = "";
    fetch(`https://api.github.com/users/${input.value}/repos`)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((el) => {
          let mainDiv = document.createElement("div");
          mainDiv.classList = "repo-box";
          mainDiv.appendChild(document.createTextNode(el.name));
          dataShow.appendChild(mainDiv);

          let stars = document.createElement("span");
          stars.appendChild(document.createTextNode(el.stargazers_count));
          let visit = document.createElement("a");
          visit.innerHTML = "Visit";
          visit.href = `https://github.com/${input.value}/${el.name}`;
          visit.setAttribute("target", "_blank");

          mainDiv.appendChild(stars);
          mainDiv.appendChild(visit);
        });
      })
      .catch((err) => {
        dataShow.innerHTML =
          "<span style='color:#F44336'>The Github Username Is Not Found</span>";
      });
  }
}
