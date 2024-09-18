const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

fetch(endpoint)
  .then((response) => response.json())
  .then((data) => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    let regExp = new RegExp(wordToMatch, "gi");
    return place.city.match(regExp) || place.state.match(regExp);
  });
}
function formatOnNumbers(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const htmlTags = matchArray.map((place) => {
    const regEx = new RegExp(this.value, "gi");
    const cityName = place.city.replace(
      regEx,
      `<span class="highlight">${this.value}</span>`
    );
    const stateName = place.city.replace(
      regEx,
      `<span class="highlight">${this.value}</span>`
    );
    return `<li>
    <span class='name'>${cityName} , ${stateName}</span>
    <span class='population'>${formatOnNumbers(place.population)}</span>
    </li>`;
  }).join("");

  suggestions.innerHTML = htmlTags;
}

const inputSearch = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

inputSearch.addEventListener("change", displayMatches);
inputSearch.addEventListener("keyup", displayMatches);
