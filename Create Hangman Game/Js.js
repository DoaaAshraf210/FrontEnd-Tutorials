let letters = "abcdefghijklmnopqrstuvwxyz";
let arrayOfLetters = Array.from(letters);

let lettersContainer = document.querySelector(".letters");
arrayOfLetters.forEach((letter) => {
  let span = document.createElement("span");
  span.appendChild(document.createTextNode(letter));
  span.className = "letter-box";
  lettersContainer.appendChild(span);
});

const words = {
  programming: [
    "Php",
    "Javascript",
    "Go",
    "Scala",
    "Fortran",
    "R",
    "Mysql",
    "Python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};
let allKeys = Object.keys(words),
  randomCategoriesIndex = Math.floor(Math.random() * allKeys.length),
  randomCategoriesValue = allKeys[randomCategoriesIndex],
  arrayOfCategoriesValue = words[randomCategoriesValue],
  randomWordIndex = Math.floor(Math.random() * arrayOfCategoriesValue.length),
  randomWordValue = arrayOfCategoriesValue[randomWordIndex].toLowerCase();
console.log(randomWordValue);

document.querySelector(".category span").innerHTML = randomCategoriesValue;
//-----------------------------------------------------------------
let lettersGuessContainer = document.querySelector(".letters-guess"),
  arrayOfGuessWord = Array.from(randomWordValue);

arrayOfGuessWord.forEach((char) => {
  let span = document.createElement("span");
  if (char === " ") {
    span.className = "space";
  }
  lettersGuessContainer.appendChild(span);
});

let spansOfGuess = document.querySelectorAll(".letters-guess span"),
  statusOfAnswer,
  wrongs = 0,
  right = 0;
// click with mouse
document.addEventListener("click", (e) => {
  statusOfAnswer = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    checkLetter(e.target);

    statusOfAnswers();
  }
});
// keybord
document.body.addEventListener("keydown", (e) => {
  statusOfAnswer = false;
  let letter;
  document.querySelectorAll(".letter-box").forEach((box) => {
    if (e.key === box.innerHTML) {
      letter = box;
      box.classList.add("clicked");
    }
  });

  checkLetter(letter);

  statusOfAnswers();
});

function endGame(message, color) {
  let div = document.createElement("div"),
    span = document.createElement("span");
  div.innerHTML =
    message + ` ${randomWordValue[0].toUpperCase()}${randomWordValue.slice(1)}`;
  div.className = "popup";
  span.innerHTML = "x";
  div.appendChild(span);
  document.body.appendChild(div);

  if (color === "green") {
    div.style.color = "green";
  } else {
    div.style.color = "red";
  }

  span.addEventListener("click", (e) => {
    e.target.parentElement.remove();
    location.reload();
  });
}

function statusOfAnswers() {
  if (!statusOfAnswer) {
    wrongs++;
    document.querySelector(".hangman-draw").classList.add(`wrong-${wrongs}`);
    document.querySelector("#wrong-answer").play();
    document.querySelector("#wrong-answer").currentTime = 0;

    if (wrongs === 5) {
      document.querySelector("#game-over").play();
      document.querySelector("#game-over").currentTime = 0;
      endGame("Game Over, The Word Is", "red");
    } else {
      document.querySelector("#wrong-answer").play();
      document.querySelector("#wrong-answer").currentTime = 0;
    }
  } else {
    right++;
    if (right === randomWordValue.length && wrongs < 5) {
      endGame("Congaratoration, You Win", "green");
      document.querySelector("#congaratoration").play();
      document.querySelector("#congaratoration").currentTime = 0;
    } else {
      document.querySelector("#success").currentTime = 0;
    }
  }
}

function checkLetter(container) {
  arrayOfGuessWord.forEach((wordLetter, wordIndex) => {
    if (container.innerHTML === wordLetter) {
      statusOfAnswer = true;

      if (wordIndex === 0) {
        spansOfGuess[wordIndex].innerHTML = container.innerHTML.toUpperCase();
      } else {
        spansOfGuess[wordIndex].innerHTML = container.innerHTML;
      }
    }
  });
}
