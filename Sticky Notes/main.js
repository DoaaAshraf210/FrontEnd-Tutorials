let numbersColor = document.querySelector(".numbers-color"),
  addNote = document.querySelector(".plus"),
  container = document.querySelector(".addition"),
  array = [];
addNote.addEventListener("click", () => {
  createNote();
});
function lisEvents() {
  document.querySelectorAll("ul li").forEach((li) => {
    li.addEventListener("click", () => {
      let textArea = li.parentElement.nextElementSibling;
      textArea.style.backgroundColor = li.className.slice(3);
      textArea.style.color = li.dataset.color;
      textArea.focus();
    });
  });
}
function createNote() {
  let div = document.createElement("div"),
    ul = document.createElement("ul"),
    textarea = document.createElement("textarea"),
    deleteButton = document.createElement("button"),
    saveButton = document.createElement("button");
  // main div
  div.className = "box";
  container.appendChild(div);
  div.id = Date.now();
  // ul
  ul.className = "bg-color";
  div.appendChild(ul);
  //lis
  for (let i = 1; i <= 6; i++) {
    let li = document.createElement("li");
    switch (i) {
      case 1:
        li.className = "bg-white";
        li.setAttribute("data-color", "black");
        break;
      case 2:
        li.className = "bg-burlywood";
        li.setAttribute("data-color", "white");

        break;
      case 3:
        li.className = "bg-cadetblue";
        li.setAttribute("data-color", "white");

        break;
      case 4:
        li.className = "bg-thistle";
        li.setAttribute("data-color", "gray");

        break;
      case 5:
        li.className = "bg-cornflowerblue";
        li.setAttribute("data-color", "white");

        break;
      case 6:
        li.className = "bg-black";
        li.setAttribute("data-color", "white");
    }
    ul.appendChild(li);
  }
  //textArea

  div.appendChild(textarea);
  textarea.focus();
  //saveButton
  saveButton.className = "save";
  saveButton.innerHTML = "Save";
  div.appendChild(saveButton);
  //deleteButton
  deleteButton.className = "delete";
  deleteButton.innerHTML = "Delete";
  div.appendChild(deleteButton);

  lisEvents();
}
function isExist(el) {
  return document.body.contains(document.querySelector(`div.${el}`));
}
function createNumberOfColor(color) {
  let div = document.createElement("div"),
    span1 = document.createElement("span"),
    span2 = document.createElement("span");
  div.className = color;
  numbersColor.appendChild(div);
  span1.className = `bg-${color}`;
  span2.innerHTML = 1;
  span2.className = "num";
  div.appendChild(span1);
  div.appendChild(span2);
  div.appendChild(document.createTextNode("Note"));
}


document.addEventListener("click", function (e) {
    if (e.target.className == "save") {
      let textAreaBgColor =
          e.target.previousElementSibling.style.backgroundColor,
        textAreaValue = e.target.previousElementSibling.value;
      if (!textAreaBgColor) textAreaBgColor = "white";

      updateOrAddItemInLocalStorage(
        e.target.parentElement.id,
        textAreaBgColor,
        textAreaValue
      );
      addNumberOfColor(textAreaBgColor);
    }
  if (e.target.className == "delete") {
    let textAreaBgColor =
      e.target.parentElement.children[1].style.backgroundColor;
    deleteNumberOfColor(textAreaBgColor);
    deleteNoteFromLocalStorage(e.target.parentElement.id);
    e.target.parentElement.remove();
  }
});

//-------------------localStorage--------------------
if (localStorage.getItem("notes")) {
  array = JSON.parse(localStorage.getItem("notes"));
  for (let i = 0; i < array.length; i++) {
    createNoteItem(array[i].id, array[i].bgColor, array[i].title);
    addNumberOfColor(array[i].bgColor);
  }
}
function createObj(id, bgColor, title) {
  let obj = {
    id: id,
    bgColor: bgColor,
    title: title,
  };
  array.push(obj);
  localStorage.setItem("notes", JSON.stringify(array));
}
function deleteNoteFromLocalStorage(id) {
  if (localStorage.getItem("notes")) {
    array = JSON.parse(localStorage.getItem("notes"));
    localStorage.setItem(
      "notes",
      JSON.stringify(
        array.filter((el) => {
          return el.id != id;
        })
      )
    );
  }
}
function createNoteItem(id, bgColor, text) {
  let div = document.createElement("div"),
    ul = document.createElement("ul"),
    textarea = document.createElement("textarea"),
    deleteButton = document.createElement("button"),
    saveButton = document.createElement("button");
  // main div
  div.className = "box";
  div.id = id;
  container.appendChild(div);
  // ul
  ul.className = "bg-color";
  div.appendChild(ul);
  //lis
  for (let i = 1; i <= 6; i++) {
    let li = document.createElement("li");
    switch (i) {
      case 1:
        li.className = "bg-white";
        li.setAttribute("data-color", "black");
        break;
      case 2:
        li.className = "bg-burlywood";
        li.setAttribute("data-color", "white");
        break;
      case 3:
        li.className = "bg-cadetblue";
        li.setAttribute("data-color", "white");
        break;
      case 4:
        li.className = "bg-thistle";
        li.setAttribute("data-color", "gray");

        break;
      case 5:
        li.className = "bg-cornflowerblue";
        li.setAttribute("data-color", "white");

        break;
      case 6:
        li.className = "bg-black";
        li.setAttribute("data-color", "white");
    }
    ul.appendChild(li);
  }
  //textArea

  div.appendChild(textarea);
  textarea.focus();
  textarea.value = text;
  textarea.style.backgroundColor = bgColor;
  if (
    bgColor == "cornflowerblue" ||
    bgColor == "cadetblue" ||
    bgColor == "burlywood" ||
    bgColor == "black"
  ) {
    textarea.style.color = "white";
  } else if (bgColor == "thistle") {
    textarea.style.color = "gray";
  } else {
    textarea.style.color = "black";
  }
  //saveButton
  saveButton.className = "save";
  saveButton.innerHTML = "Save";
  div.appendChild(saveButton);
  //deleteButton
  deleteButton.className = "delete";
  deleteButton.innerHTML = "Delete";
  div.appendChild(deleteButton);

  lisEvents();
}
function updateOrAddItemInLocalStorage(id, bgColor, text) {
  let isFound = false,
    idx;
  if (!localStorage.getItem("notes")) {
    createObj(id, bgColor, text);
  } else {
    array = JSON.parse(localStorage.getItem("notes"));
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == id) {
        isFound = true;
        idx = i;
      }
    }
    if (isFound) {
      deleteNumberOfColor(array[idx].bgColor);
      array[idx].bgColor = bgColor;
      array[idx].title = text;
      localStorage.setItem("notes", JSON.stringify(array));
    } else {
      createObj(id, bgColor, text);
    }
  }
}
function addNumberOfColor(bg) {
  if (!isExist(bg)) {
    createNumberOfColor(bg);
  } else {
    document.querySelector(`div.${bg} .num`).innerHTML =
      +document.querySelector(`div.${bg} .num`).innerHTML + 1;
  }
}

function deleteNumberOfColor(bg) {
  if (document.querySelector(`div.${bg} .num`)) {
    if (+document.querySelector(`div.${bg} .num`).innerHTML > 1) {
      document.querySelector(`div.${bg} .num`).innerHTML =
        +document.querySelector(`div.${bg} .num`).innerHTML - 1;
    } else {
      document.querySelector(`div.${bg} .num`).parentElement.remove();
    }
  }
}
