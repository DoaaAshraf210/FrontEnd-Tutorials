let inputs = document.querySelectorAll("input:not(:last-of-type)"),
  arr = [],
  storedArray;
// localStorage.clear();
// sessionStorage.clear();
if (sessionStorage.getItem("arrayOfValues")) {
  storedArray = JSON.parse(sessionStorage.getItem("arrayOfValues"));
  for (let i = 0, j = 0; i < storedArray.length; i++, j++) {
    inputs[j].value = storedArray[i];
  }
}
inputs.forEach((element) => {
  element.addEventListener("blur", function (e) {
    if (e.target.value !== "") {
      arr.push(e.target.value);
      window.sessionStorage.setItem("arrayOfValues", JSON.stringify(arr));
    }
  });
});

// Start selection code-----------------------------------
if (isFound("color", "idColor")) {
  document.body.style.backgroundColor = window.sessionStorage.color;
  setSelected("colors", "idColor");

  document.querySelector("select").style.backgroundColor =
    window.sessionStorage.color;

  setSelected("colors", "idColor");
}
document.querySelector(`[name="colors"]`).onchange = function (e) {
  let idx = removeSelectedAttr(6, e.target);
  setValuesInBodyAndLocalStorage(e.target, "idColor", "color", idx);
  document.body.style.backgroundColor = e.target.value;
  document.querySelector("select").style.backgroundColor = e.target.value;
};
///Functions--------------------------------
function removeSelectedAttr(n, nodes) {
  let idx;
  for (let i = 0; i < n; i++) {
    if (nodes.value === nodes[i].innerHTML) idx = i;
  }
  for (let i = 0; i < n; i++) {
    nodes[i].removeAttribute("selected");
  }
  return idx;
}
function isFound(id, attr) {
  if (window.sessionStorage.getItem(id) && window.sessionStorage.getItem(attr))
    return true;
  else return false;
}
function setValuesInBodyAndLocalStorage(nodes, id, attr, index) {
  window.sessionStorage.setItem(id, index);
  window.sessionStorage.setItem(attr, nodes.value);
  nodes[index].setAttribute("selected", "");
}
function setSelected(selestedName, id) {
  document
    .querySelector(`[name=${selestedName}]`)
    [window.sessionStorage[id]].setAttribute("selected", "");
}
// End selection code-----------------------------------
