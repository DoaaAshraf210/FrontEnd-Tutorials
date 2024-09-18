let serialNumber = document.querySelector(".serial"),
  btnGenerate = document.querySelector(".generate"),
  characters =
    "opqrstuvwxyzABCDEFGHIJKLMNOPQRSTYVWX0123456789!@cdefghi4567#$%^&*abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTYVWXYZ",
  serialNumberLength = 20;
btnGenerate.onclick = function () {
  let randomSerial = "";
  for (let i = 1; i <= serialNumberLength; i++) {
    randomSerial += characters[Math.floor(Math.random() * characters.length)];
  }
  serialNumber.innerHTML = randomSerial;
};
