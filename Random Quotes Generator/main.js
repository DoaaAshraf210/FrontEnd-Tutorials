let buttons = document.querySelectorAll("button"),
  q = document.querySelector("q"),
  number = document.querySelector(".number"),
  interval;

fetch("quotes.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    q.innerHTML = data[`text-1`];
    buttons.forEach((button) => {
      button.onclick = function (e) {
        if (e.target.className === "generator") generatorRandomQuotes();
        if (e.target.className === "auto") generatorAutoQuotes();
        if (e.target.className === "stop") {
          clearInterval(interval);
          document.querySelector(".auto-on").remove();
        }
      };
    });
    function generatorRandomQuotes() {
      q.innerHTML = data[`text-${++number.innerHTML}`];
      if (number.innerHTML > Object.keys(data).length) {
        number.innerHTML = 1;
        q.innerHTML = data[`text-1`];
      }
    }

    function generatorAutoQuotes() {
      interval = setInterval(() => {
        let randomIndexOfQuotes = Math.floor(
          Math.random() * Object.keys(data).length + 1
        );

        console.log(randomIndexOfQuotes);
        q.innerHTML = data[`text-${randomIndexOfQuotes}`];
        number.innerHTML = randomIndexOfQuotes;
      }, 2500);

      let runAuto = document.createElement("div");
      runAuto.className = "auto-on";
      runAuto.appendChild(document.createTextNode("Auto On"));
      document.body.appendChild(runAuto);
    }
  });
