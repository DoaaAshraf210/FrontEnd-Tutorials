let duration = 1000,
  blocksContainer = document.querySelector(".game-blocks"),
  blocks = Array.from(blocksContainer.children),
  arrayOfRandomlyElement = [],
  randomIndex;

document.querySelector(".button-controls span").onclick = function () {
  let username = prompt("Your Name ?");
  username = username || "Unknown";
  document.querySelector(
    ".name span"
  ).innerHTML = `${username[0].toUpperCase()}${username.slice(1)}`;
  document.querySelector(".button-controls").remove();

  blocks.forEach((block) => {
    block.classList.add("flipped");
  });

  setTimeout(() => {
    blocks.forEach((block) => {
      block.classList.remove("flipped");
    });
  }, 2000);
};

blocks.forEach((block) => {
  block.classList.add("flipped");
});

blocks.forEach((block) => {
  block.style.order = shuffle();
  block.addEventListener("click", () => {
    flip(block);
  });
});

function shuffle() {
  randomIndex = Math.floor(Math.random() * blocks.length);

  return randomIndex;
}
function flip(el) {
  el.classList.add("flipped");

  let flipBlocks = blocks.filter((block) =>
    block.classList.contains("flipped")
  );

  if (flipBlocks.length === 2) {
    stopCLicking();
    matchBlocks(flipBlocks[0], flipBlocks[1]);
  }
}

function stopCLicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}
let numberOfBlochMatching = 0;
function matchBlocks(block1, block2) {
  let tries = document.querySelector(".tries span");

  if (block1.dataset.game === block2.dataset.game) {
    block1.classList.remove("flipped");
    block2.classList.remove("flipped");

    numberOfBlochMatching++;
    if (numberOfBlochMatching == blocks.length / 2) {
      endGame("Congrats", "green");
    }

    block1.classList.add("match");
    block2.classList.add("match");

    document.getElementById("success").play();
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) - 1;

    if (tries.innerHTML == 1) {
      tries.style.color = "red";
    }
    if (tries.innerHTML == 0) {
      endGame("Game Over", "red");
    }
    document.getElementById("fail").play();
    setTimeout(() => {
      block1.classList.remove("flipped");
      block2.classList.remove("flipped");
    }, duration - 500);
  }
}

function endGame(message, color) {
  let div = document.createElement("div"),
    span = document.createElement("span");
  div.innerHTML = message;
  div.className = "popup";
  span.innerHTML = "x";
  div.appendChild(span);
  document.body.appendChild(div);

  if (color === "green") {
    div.style.color = "green";
  } else {
    div.style.color = "red";
  }

  span.addEventListener("click", (e) => {
    e.target.parentElement.remove();
    location.reload();
  });
}
