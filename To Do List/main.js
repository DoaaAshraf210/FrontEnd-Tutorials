let input = document.querySelector("input"),
  addTask = document.querySelector(".plus"),
  tasksContainer = document.querySelector(".tasks-content"),
  nOfTasks = document.querySelector(".tasks-count span"),
  nOfTasksCompleted = document.querySelector(".tasks-completed span"),
  arrayOfTasks = [],
  storedArray = [];

window.onload = function () {
  input.focus();
  if (
    localStorage.getItem("tasks") &&
    document.querySelector(".no-tasks-message")
  ) {
    document.querySelector(".no-tasks-message").remove();
  }
};

if (localStorage.getItem("tasks")) {
  let counterOfFinishedTasks = 0;
  nOfTasksCompleted.innerHTML = counterOfFinishedTasks;

  storedArray = JSON.parse(localStorage.getItem("tasks"));
  for (let i = 0; i < storedArray.length; i++) {
    createTextBox(
      storedArray[i].title,
      storedArray[i].id,
      storedArray[i].completed
    );
    if (storedArray[i].completed) {
      counterOfFinishedTasks++;
    }

    nOfTasks.innerHTML = storedArray.length;
    nOfTasksCompleted.innerHTML = counterOfFinishedTasks;
  }
}
addTask.addEventListener("click", () => {
  if (input.value === "") {
    createPopup("Please Add Task");
  } else if (arrayOfTasks.includes(input.value)) {
    createPopup("This Task already exists.");
  } else {
    if (document.querySelector(".no-tasks-message"))
      document.querySelector(".no-tasks-message").remove();
    createTextBox(input.value);
    OperationsOnTasks();
    createObject(input.value);
    input.value = "";
    input.focus();
  }
});

document.querySelectorAll(".delete").forEach((btnDelete) => {
  btnDelete.addEventListener("click", function (e) {
    let txt = e.target.parentElement.childNodes[0];
    e.target.parentElement.remove();
    arrayOfTasks.splice(arrayOfTasks.indexOf(txt), 1);
    deleteTaskFromLocalStorage(e.target.parentElement.dataset.id);

    input.focus();
    OperationsOnTasks();
    if (nOfTasks.innerHTML == 0) {
      createNoTasksMessage();
    }
  });
});

document.querySelectorAll(".task-box").forEach((box) => {
  box.addEventListener("click", function (e) {
    e.target.classList.toggle("finished");
    if (e.target.classList.contains("finished"))
      setCompletedTask(e.target.dataset.id);
    else setUnCompletedTask(e.target.dataset.id);
    OperationsOnTasks();
  });
});

document.querySelector(".delete-all").onclick = function () {
  tasksContainer.innerHTML = "";
  localStorage.removeItem("tasks");
  createNoTasksMessage();
  nOfTasks.innerHTML = 0;
  nOfTasksCompleted.innerHTML = 0;
  input.focus();
};
document.querySelector(".finish-all").onclick = function (e) {
  let allTasks = document.querySelectorAll(".task-box");
  allTasks.forEach((task) => {
    task.classList.add("finished");
    if (task.classList.contains("finished")) {
      allTasks.forEach((task) => {
        setCompletedTask(task.dataset.id);
      });

      nOfTasksCompleted.innerHTML = allTasks.length;
    }
  });
};
document.querySelector(".un-finish-all").onclick = function (e) {
  let allTasks = document.querySelectorAll(".task-box");
  allTasks.forEach((task) => {
    task.classList.remove("finished");
    if (!task.classList.contains("finished")) {
      allTasks.forEach((task) => {
        setUnCompletedTask(task.dataset.id);
      });

      nOfTasksCompleted.innerHTML = 0;
    }
  });
};

//----------------Functions----------------
function createTextBox(text, id, stat) {
  let span = document.createElement("span"),
    deleteButton = document.createElement("span");
  span.className = "task-box";
  span.setAttribute("data-id", id);
  if (stat) span.className = "task-box finished";
  deleteButton.className = "delete";
  span.appendChild(document.createTextNode(text));
  deleteButton.appendChild(document.createTextNode("Delete"));
  span.appendChild(deleteButton);
  tasksContainer.appendChild(span);
  arrayOfTasks.push(input.value);
}
function createPopup(text) {
  let div = document.createElement("div"),
    span = document.createElement("span");
  div.className = "alert";
  div.appendChild(document.createTextNode(text));

  span.appendChild(document.createTextNode("x"));
  div.appendChild(span);
  document.body.prepend(div);
  input.value = "";
  input.focus();

  div.style.display = "flex";
  span.addEventListener("click", (e) => {
    e.target.parentElement.remove();
    input.focus();
  });
}
function createNoTasksMessage() {
  let span = document.createElement("span");
  span.className = "no-tasks-message";
  span.appendChild(document.createTextNode("No Tasks To Show"));
  tasksContainer.append(span);
}
function OperationsOnTasks() {
  nOfTasks.innerHTML = document.querySelectorAll(".task-box").length;
  nOfTasksCompleted.innerHTML =
    document.querySelectorAll(".task-box.finished").length;
}
//------------------------localStorage Coding-----------------
function createObject(text) {
  let obj = {
    id: Date.now(),
    title: text,
    completed: false,
    numberOfTasks: document.querySelectorAll(".task-box").length,
  };
  storedArray.push(obj);
  localStorage.setItem("tasks", JSON.stringify(storedArray));
}
function deleteTaskFromLocalStorage(id) {
  let index;
  if (localStorage.getItem("tasks")) {
    storedArray = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < storedArray.length; i++) {
      if (storedArray[i].id == id) {
        index = i;
      }
    }
  }
  storedArray.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(storedArray));
}
function setCompletedTask(id) {
  if (localStorage.getItem("tasks")) {
    storedArray = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < storedArray.length; i++) {
      if (storedArray[i].id == id) {
        storedArray[i].completed = true;
      }
    }
  }
  localStorage.setItem("tasks", JSON.stringify(storedArray));
}
function setUnCompletedTask(id) {
  if (localStorage.getItem("tasks")) {
    storedArray = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < storedArray.length; i++) {
      if (storedArray[i].id == id) {
        storedArray[i].completed = false;
      }
    }
  }
  localStorage.setItem("tasks", JSON.stringify(storedArray));
}
