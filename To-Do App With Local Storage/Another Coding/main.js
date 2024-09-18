// window.localStorage.clear();

let inputText = document.querySelector(`[type="text"]`),
  inputSubmit = document.querySelector(`[type="submit"]`),
  container = document.querySelector(".container"),
  parent = document.createElement("div"),
  cnt = 0,
  storedArray,
  arrayOfTasks = [];

parent.classList = "new-task";

if (localStorage.getItem("tasks")) {
  storedArray = JSON.parse(localStorage.getItem("tasks"));
  storedArray.forEach((element) => {
    addNewTask(element["title"]);
  });
}
inputSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  if (inputText.value !== "") {
    cnt++;
    if (!isFound(inputText.value)) {
      addNewTask(inputText.value);
      createObject(cnt, inputText.value);
    }

    inputText.value = "";
  }
});

//function---------------------------------
function addNewTask(text) {
  container.appendChild(parent);
  let child = document.createElement("div");
  child.appendChild(document.createTextNode(text));
  let button = document.createElement("button");
  button.appendChild(document.createTextNode("delete"));
  child.appendChild(button);
  parent.appendChild(child);

  button.addEventListener("click", function (event) {
    deleteTask(event.target, text);
  });
}
function createObject(id, text) {
  let obj = {};
  obj.id = id;
  obj.title = text;
  arrayOfTasks.push(obj);
  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function deleteTask(task, text) {
  task.parentElement.remove();
  if (localStorage.getItem("tasks")) {
     storedArray = JSON.parse(localStorage.getItem("tasks"));
    localStorage.setItem(
      "tasks",
      JSON.stringify(
        storedArray.filter(function (el) {
          return text !== el["title"];
        })
      )
    );
  }
}

function isFound(text) {
  if (arrayOfTasks.length > 0) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
      if (arrayOfTasks[i]["title"] === text) {
        return true;
      }
    }
    return false;
  }
}
