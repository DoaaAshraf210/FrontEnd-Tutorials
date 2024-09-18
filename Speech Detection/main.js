window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = "en-US";

let p = document.createElement("p");
let words = document.querySelector(".words");
words.appendChild(p);
recognition.addEventListener("result", (e) => {
  let tranScript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  p.textContent = tranScript;
  if (e.results[0].isFinal) {
    p = document.createElement("p");
    words.appendChild(p);
  }
});

let i = document.querySelector("i");

i.addEventListener("click", () => {
  recognition.start();
  i.style.backgroundColor = "red";
  i.classList.toggle("active");
});
recognition.addEventListener("end", () => {
  
  i.style.backgroundColor = "black";
  i.classList.toggle("active");
});
