let typedText = document.querySelector(".typed-text"),
  cursor = document.querySelector(".cursor"),
  arrayOfMessages = [
    "FrontEnd Developer",
    "BackEnd Developer",
    "Flutter Developer",
    "Paython Developer",
    "Java Developer",
  ],
  index = 0,
  indexOfChar = 0,
  speed = 200;

function changeValue() {
  index++;
  if (index == arrayOfMessages.length) {
    index = 0;
  }
}

let typeWriter = () => {
  typedText.innerHTML = arrayOfMessages[index].substring(0, indexOfChar);

  setTimeout(typeWriter, speed);
  if (indexOfChar != arrayOfMessages[index].length) {
    indexOfChar++;
  } else {
    changeValue();
    indexOfChar = 0;
  }
};
window.onload = typeWriter;
