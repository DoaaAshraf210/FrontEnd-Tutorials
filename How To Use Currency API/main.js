let inputs = document.querySelectorAll("input:not(.amount)"),
  amount = document.querySelector(".amount"),
  button = document.querySelector("button"),
  arrayOfValues = [];

inputs.forEach((element) => {
  element.addEventListener("input", function () {
    arrayOfValues.push(this.value);
  });
});

button.addEventListener("click", function () {
  if (arrayOfValues.length !== 0) {
    fetch(
      "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=cf8167eaa2884cf5b73fb1d5d45122ab"
    )
      .then((response) => response.json())
      .then((data) => {
        let coin1 = +data.rates[arrayOfValues[0]],
          coin2 = +data.rates[arrayOfValues[1]],
          result = (+amount.value * coin2) / coin1;

        let span = document.createElement("span");
        span.className = "result";
        span.appendChild(document.createTextNode(result.toFixed(2)));

        document.querySelector(".container").appendChild(span);
      });
  }
});
