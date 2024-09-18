let hexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"]; //0 15
let colorArray = [];
for (let i = 0; i < 6; i++) {
  colorArray.push(hexArray[Math.floor(Math.random() * hexArray.length)]);
}

document.body.append(`#${colorArray.join("")}`);
document.body.style.backgroundColor = `#${colorArray.join("")}`;
document.body.style.color = "white";
document.body.style.fontSize = "30px";
document.body.style.textAlign = "center";
