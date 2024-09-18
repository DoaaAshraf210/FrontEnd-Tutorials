let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Game Created By Elzero Web School`;
//-----------------------------------------------------
let wordToGuess = "",
  currentTry = 1,
  words = [
    "Dog",
    "Cat",
    "Cow",
    "Horse",
    "Sheep",
    "Pig",
    "Goat",
    "Rabbit",
    "Lion",
    "Tiger",
    "Elephant",
    "Bear",
    "Giraffe",
    "Zebra",
    "Kangaroo",
    "Gorilla",
    "Dolphin",
    "Whale",
    "Seal",
    "Manatee",
    "Sea Otter",
    "Mouse",
    "Rat",
    "Squirrel",
    "Hamster",
    "Ferret",
    "Birds",
    "Sparrow",
    "Robin",
    "Eagle",
    "Owl",
    "Parrot",
    "Penguin",
    "Duck",
    "Swan",
    "Goose",
    "Hawk",
    "Falcon",
    "Vulture",
    "Canary",
    "Nightingale",
    "Bluebird",
    "Reptiles",
    "Python",
    "Cobra",
    "Rattlesnake",
    "Gecko",
    "Komodo Dragon",
    "Iguana",
    "Chameleon",
    "Sea Turtle",
    "Box Turtle",
    "Amphibians",
    "Tree Frog",
    "Bullfrog",
    "Leopard Frog",
    "Axolotl",
    "Newt",
    "Fish",
    "Salmon",
    "Trout",
    "Catfish",
    "Goldfish",
    "Bass",
    "Clownfish",
    "Shark",
    "Tuna",
    "Swordfish",
    "Mackerel",
    "Insects",
    "Butterfly",
    "Bee",
    "Ant",
    "Dragonfly",
    "Beetle",
    "Housefly",
    "Mosquito",
    "Moth",
    "Fruit Fly",
    "Grasshopper",
    "Cockroach",
    "Termite",
    "Praying Mantis",
    "Octopus",
    "Squid",
    "Snail",
    "Clam",
    "Oyster",
    "Crab",
    "Lobster",
    "Shrimp",
    "Krill",
    "Barnacle",
  ];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let message = document.querySelector(".message"),
  checkButton = document.querySelector(".check"),
  hintButton = document.querySelector(".hint");

let numbersOfTries = 3,
  numbersOfLetters = wordToGuess.length,
  numberOfHints = 2;

window.onload = function () {
  document.querySelector(".hint span").innerHTML = numberOfHints;
  let inputContainer = document.querySelector(".inputs");
  for (let i = 1; i <= numbersOfTries; i++) {
    let tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i !== 1) tryDiv.classList.add("disabled-input");

    for (let j = 1; j <= numbersOfLetters; j++) {
      let myInput = document.createElement("input");
      myInput.type = "text";
      myInput.id = `try-${i}-letter-${j}`;
      myInput.setAttribute("maxLength", "1");
      tryDiv.appendChild(myInput);
    }

    inputContainer.appendChild(tryDiv);
  }
  inputContainer.children[0].children[1].focus();
  let inputsInDisabledDiv = document.querySelectorAll(".disabled-input input");
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));

  let inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", (event) => {
      event.target.value = event.target.value.toUpperCase();
      if (inputs[index + 1]) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (event) => {
      const currentIndex = Array.from(inputs).indexOf(event.target);
      if (event.key === "ArrowLeft") {
        let prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
      if (event.key === "ArrowRight") {
        let nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
    });
  });
};

checkButton.onclick = function () {
  let successGuess = true;
  for (let i = 1; i <= numbersOfLetters; i++) {
    let inputField = document.querySelector(`#try-${currentTry}-letter-${i}`),
      inputValue = inputField.value.toLowerCase(),
      actualLetter = wordToGuess[i - 1];

    if (inputValue === actualLetter) {
      inputField.classList.add("yes-in-place");
    } else if (wordToGuess.includes(inputValue) && inputValue !== "") {
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("no");
      successGuess = false;
    }
  }

  if (successGuess) {
    message.innerHTML = `You Win`;
    if (numberOfHints === 2) {
      message.innerHTML = `<p>Congratz You Didn't Use Hints</p>`;
    }

    document
      .querySelectorAll(".inputs > div")
      .forEach((div) => div.classList.add("disabled-input"));

    checkButton.disabled = true;
    hintButton.disabled = true;
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-input");
    document
      .querySelectorAll(`.try-${currentTry} input`)
      .forEach((input) => (input.disabled = true));

    currentTry++;
    let nextTry = document.querySelector(`.try-${currentTry}`);

    if (nextTry) {
      nextTry.classList.remove("disabled-input");
      document
        .querySelectorAll(`.try-${currentTry} input`)
        .forEach((input) => (input.disabled = false));
    } else {
      checkButton.disabled = true;
      hintButton.disabled = true;
      message.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`;
    }
  }
};
hintButton.onclick = function () {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
  }
  if (numberOfHints == 0) {
    hintButton.disabled = true;
  }
  let enableInputs = document.querySelectorAll("input:not([disabled])"),
    emptyInputs = Array.from(enableInputs).filter((el) => el.value === "");

  if (emptyInputs.length > 0) {
    let randomIndex = Math.floor(Math.random() * emptyInputs.length),
      randomInput = emptyInputs[randomIndex],
      indexToFill = Array.from(enableInputs).indexOf(randomInput);

    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }
};
document.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    let enableInputs = document.querySelectorAll("input:not([disabled])"),
      currentIndex = Array.from(enableInputs).indexOf(document.activeElement);
    if (currentIndex > 0) {
      let currentInput = enableInputs[currentIndex],
        prevInput = enableInputs[currentIndex - 1];
      currentInput.value = "";
      prevInput.value = "";
      prevInput.focus();
    }
  }
});
