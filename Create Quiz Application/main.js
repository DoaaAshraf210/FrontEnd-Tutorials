let numberOfQuestions = document.querySelector(".count span"),
  bullets = document.querySelector(".bullets .spans"),
  submitButton = document.querySelector(".submit-button"),
  quizArea = document.querySelector(".quiz-area"),
  answersArea = document.querySelector(".answers-area"),
  currentQuestion = 0,
  numberOfRightAnswers = 0,
  interval;

function getQuestions() {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let jsObj = JSON.parse(this.responseText);
      // createBullets(Object.keys(jsObj).length);
      createBullets(jsObj.length);
      addQuestionData(jsObj[currentQuestion], jsObj.length);
      countdown(3, jsObj.length);
      submitButton.onclick = function () {
        let rightAnswer = jsObj[currentQuestion]["right-answer"];
        currentQuestion++;
        checkAnswer(rightAnswer, jsObj.length);
        quizArea.innerHTML = "";
        answersArea.innerHTML = "";
        addQuestionData(jsObj[currentQuestion], jsObj.length);
        handelBullets();
        clearInterval(interval);
        countdown(3, jsObj.length);
        showResult(jsObj.length);
      };
    }
  };

  request.open("GET", "questions.json", true);
  request.send();
}
getQuestions();

function createBullets(num) {
  numberOfQuestions.innerHTML = num;

  for (let i = 1; i <= num; i++) {
    let span = document.createElement("span");
    if (i === 1) {
      span.className = "in-question";
    }
    bullets.appendChild(span);
  }
}
function addQuestionData(obj, numberOfQuestions) {
  if (currentQuestion < numberOfQuestions) {
    let h2 = document.createElement("h2");
    h2.innerHTML = `<span>${currentQuestion + 1}- </span>`;
    h2.appendChild(document.createTextNode(obj.title));
    quizArea.appendChild(h2);

    for (let i = 1; i <= 4; i++) {
      let div = document.createElement("div");
      div.className = "answer";
      answersArea.appendChild(div);

      let radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.id = `answer-${i}`;
      radioInput.name = `question`;
      radioInput.dataset.answer = obj[`answer-${i}`];
      if (i === 1) {
        radioInput.checked = true;
      }
      div.appendChild(radioInput);

      let label = document.createElement("label");
      label.htmlFor = `answer-${i}`;
      label.appendChild(document.createTextNode(obj[`answer-${i}`]));

      div.appendChild(label);
    }
  }
}

function checkAnswer(rightAnswer, numberOfQuestions) {
  let answers = document.getElementsByName("question"),
    chosenAnswer;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      chosenAnswer = answers[i].dataset.answer;
    }
  }
  if (rightAnswer === chosenAnswer) {
    numberOfRightAnswers++;
  }
}
function handelBullets() {
  let bullets = document.querySelectorAll(".bullets .spans span");
  bullets.forEach((bullet, index) => {
    if (currentQuestion === index) {
      bullet.className = "in-question";
    }
  });
}
function showResult(numberOfQuestions) {
  let results;
  if (currentQuestion === numberOfQuestions) {
    quizArea.remove();
    answersArea.remove();
    document.querySelector(".bullets").remove();
    submitButton.remove();

    if (
      numberOfRightAnswers > numberOfQuestions / 2 &&
      numberOfRightAnswers < numberOfQuestions
    ) {
      results = `<span class="good">Good</span>, ${numberOfRightAnswers} From ${numberOfQuestions}`;
    } else if (numberOfRightAnswers === numberOfQuestions) {
      results = `<span class="perfect">Perfect</span>, All Answers Is Good`;
    } else {
      results = `<span class="bad">Bad</span>, ${numberOfRightAnswers} From ${numberOfQuestions}`;
    }

    document.querySelector(".result").innerHTML = results;
  }
}

function countdown(duration, numberOfQuestions) {
  if (currentQuestion < numberOfQuestions) {
    interval = setInterval(() => {
      let minutes = parseInt(duration / 60);
      let seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      document.querySelector(".countdown").innerHTML = `${minutes}:${seconds}`;

      if (--duration < 0) {
        clearInterval(interval);
        submitButton.click();
      }
    }, 1000);
  }
}
