let LevelSelected = document.querySelector(".message .level"),
  LevelSeconds = document.querySelector(".message .seconds"),
  startBtn = document.querySelector("button"),
  TheWord = document.querySelector(".word"),
  input = document.querySelector(".input"),
  upcomingWords = document.querySelector(".upcoming-words"),
  timeSpan = document.querySelector(".time span"),
  scoreGot = document.querySelector(".score .got"),
  scoreTotal = document.querySelector(".score .total"),
  finish = document.querySelector(".finish"),
  vocab = [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
    "Syria",
    "Palestine",
    "Yemen",
    "Egypt",
    "Bahrain",
    "Qatar",
    "Hello",
    "Programming",
    "Code",
    "JavaScript",
    "Twon",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "GitHub",
    "Leetcode",
    "Internet",
    "Python",
    "Scale",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing",
  ],
  words = {
    Easy: vocab.filter((el) => el.length <= 4),
    Middle: vocab.filter((el) => el.length > 4 && el.length <= 8),
    Hard: vocab.filter((el) => el.length > 8),
  },
  levels = {
    Easy: 4,
    Middle: 3,
    Hard: 2,
  },
  defaultLevelName = "Easy",
  defaultLevelSeconds = levels[defaultLevelName];
plays();

input.onpaste = function () {
  return false;
};
LevelSelected.onchange = function (e) {
 
  defaultLevelName = e.target.value;
  defaultLevelSeconds = levels[defaultLevelName];
  LevelSeconds.innerHTML = defaultLevelSeconds;
  timeSpan.innerHTML = defaultLevelSeconds;
  scoreTotal.innerHTML = words[defaultLevelName].length;
  plays();
};

function plays() {
  startBtn.onclick = function () {
    this.remove();
    input.focus();
    generateWord();
  };

  function generateWord() {
    let randomWord =
      words[defaultLevelName][
        Math.floor(Math.random() * words[defaultLevelName].length)
      ];

    let indexWord = words[defaultLevelName].indexOf(randomWord);
    words[defaultLevelName].splice(indexWord, 1);
    TheWord.innerHTML = randomWord;
    upcomingWords.innerHTML = "";
    for (let i = 0; i < words[defaultLevelName].length; i++) {
      let div = document.createElement("div");
      let text = document.createTextNode(words[defaultLevelName][i]);
      div.appendChild(text);
      upcomingWords.appendChild(div);
    }
    startPlay();
  }
  function startPlay() {
    timeSpan.innerHTML = defaultLevelSeconds;
    let start = setInterval(() => {
      timeSpan.innerHTML--;
      if (timeSpan.innerHTML == "0") {
        clearInterval(start);
        if (TheWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
          input.value = "";
          scoreGot.innerHTML++;
          if (words[defaultLevelName].length > 0) {
            generateWord();
          } else {
            let span = document.createElement("span");
            let txt = document.createTextNode("You Win");
            span.className = "good";
            span.appendChild(txt);
            finish.appendChild(span);
          }
        } else {
          let span = document.createElement("span");
          let txt = document.createTextNode("GameOver");
          span.className = "bad";
          span.appendChild(txt);
          finish.appendChild(span);
        }
      }
    }, 1000);
  }
}
