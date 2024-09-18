let imp = document.querySelector(".imp");
// window.localStorage.clear();
// first select box  -------------------------------------------------------
if (isFound("fontFamily", "idFontFamily")) {
  imp.style.fontFamily = window.localStorage.fontFamily;
  setSelected("fonts", "idFontFamily");
}
document.querySelector(`[name="fonts"]`).onchange = function (e) {
  let idx = removeSelectedAttr(3, e.target);
  setValuesInBodyAndLocalStorage(e.target, "idFontFamily", "fontFamily", idx);
  imp.style.fontFamily = e.target.value;
};
//second select box -------------------------------------------------------
if (isFound("color", "idColor")) {
  imp.style.color = window.localStorage.color;
  setSelected("colors", "idColor");
}
document.querySelector(`[name="colors"]`).onchange = function (e) {
  let idx = removeSelectedAttr(6, e.target);

  setValuesInBodyAndLocalStorage(e.target, "idColor", "color", idx);

  imp.style.color = e.target.value;
};
//third select box ---------------------------------------
if (isFound("fontSize", "idFontSize")) {
  imp.style.fontSize = window.localStorage.fontSize + "px";
  setSelected("size", "idFontSize");
}
document.querySelector(`[name="size"]`).onchange = function (e) {
  let idx = removeSelectedAttr(15, e.target);
  setValuesInBodyAndLocalStorage(e.target, "idFontSize", "fontSize", idx);
  imp.style.fontSize = e.target.value + "px";
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
  if (window.localStorage.getItem(id) && window.localStorage.getItem(attr))
    return true;
  else return false;
}
function setValuesInBodyAndLocalStorage(nodes, id, attr, index) {
  window.localStorage.setItem(id, index);
  window.localStorage.setItem(attr, nodes.value);
  nodes[index].setAttribute("selected", "");
}
function setSelected(selestedName, id) {
  document
    .querySelector(`[name=${selestedName}]`)
    [window.localStorage[id]].setAttribute("selected", "");
}
