// Select Elements

let allSpans = document.querySelectorAll(".buttons span"),
  results = document.querySelector(".results > span"),
  keyInput = document.querySelector("input:first-child"),
  valueInput = document.querySelector("input:last-child");

allSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.classList.contains("check-item")) checkItem();

    if (e.target.classList.contains("add-item")) addItem();

    if (e.target.classList.contains("delete-item")) deleteItem();

    if (e.target.classList.contains("show-items")) showItems();
  });
});

function showMessage() {
  results.innerHTML = "Input Can't Be Empty";
}

function checkItem() {
  if (keyInput.value !== "") {
    if (localStorage.getItem(keyInput.value)) {
      results.innerHTML = `Found Local Storage Item Called <span>${keyInput.value}</span>`;
    } else {
      results.innerHTML = `Not Found Local Storage Item With The Name <span>${keyInput.value}</span>`;
    }
  } else {
    showMessage();
  }
}

function addItem() {
  if (keyInput.value !== "") {
    if (valueInput.value !== "") {
      localStorage.setItem(keyInput.value, valueInput.value);
      results.innerHTML = `Local Storage Item <span>${keyInput.value}</span> : <span>${valueInput.value}</span> Added`;

      keyInput.value = "";
      valueInput.value = "";
    } else {
      results.innerHTML = "Please Enter Value Of This Item";
    }
  } else {
    showMessage();
  }
}

function deleteItem() {
  if (keyInput.value !== "") {
    if (localStorage.getItem(keyInput.value)) {
      localStorage.removeItem(keyInput.value);
      results.innerHTML = `Local Storage Item <span>${keyInput.value}</span> Deleted`;

      keyInput.value = "";
    } else {
      results.innerHTML = "Please Enter Value Of This Item";
    }
  } else {
    showMessage();
  }
}

function showItems() {
  if (localStorage.length) {
    console.log(`Found Elements ${localStorage.length}`);

    results.innerHTML = "";

    for (let [key, value] of Object.entries(localStorage)) {
      results.innerHTML += `<span class="keys">${key}</span>`;
    }
  } else {
    results.innerHTML = `Local Storage Is Empty`;
  }
}
