const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
let items = [];

if (localStorage.getItem("items")) {
  items = JSON.parse(localStorage.getItem("items"));
}
function addItem(e) {
  e.preventDefault();
  const text = this.querySelector("[name=item]").value;
  const item = {
    text,
    done: false,
  };

  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
  addItemsListToPage(items, itemsList);
  this.reset();
  this.querySelector("[name=item]").focus();
}

function addItemsListToPage(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, idx) => {
      return `
        <li>
          <input type="checkbox" data-index=${idx} id="item-${idx}" ${
        plate.done ? "checked" : ""
      } />
          <label for="item-${idx}">${plate.text}</label>
          <span class="basket">${"🗑️"}</span>
        </li>
      `;
    })
    .join("");
}

function toggleDone(e) {
  if (!e.target.matches("input")) return;

  const index = e.target.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  addItemsListToPage(items, itemsList);
}
function removePlate(e) {
  if (!e.target.matches("span")) return;

  let index = e.target.parentElement.children[0].dataset.index;
  items.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(items));
  addItemsListToPage(items, itemsList);
  e.target.parentElement.remove();
}
addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
addItemsListToPage(items, itemsList);
itemsList.addEventListener("click", removePlate);
