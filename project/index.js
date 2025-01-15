const body = document.querySelector("body");
const container = document.querySelector(".grid-container");
const button = document.getElementById("start");
const display = document.getElementById("main");
const option = document.querySelector(".main");
let snakeColor = "blue";
let x = 0;
let y = 0;
let snakeSize = 1;
let movement = "right";
let startCon = false;
let gameruntime = true;
let foodAvailable = false;
let snakeBody = [[x, y]];
let rx;
let ry;
let score = 1;
let gameSpeed = 500;

document.querySelectorAll('input[name="difficulity"]').forEach((radio) => {
  radio.addEventListener('change', (event) => {
    const difficulty = event.target.value;
    if (difficulty === "easy") gameSpeed = 500;
    if (difficulty === "middium") gameSpeed = 300;
    if (difficulty === "hard") gameSpeed = 200;
    if (difficulty === "impossible") gameSpeed = 100;
    if (difficulty === "impossibleLitrally") gameSpeed = 50;
    
    console.log(`Game speed set to ${gameSpeed}ms for ${difficulty} mode.`);
    restartGameLoop(); // Restart game loop with new speed
  });
});

function restartGameLoop() {
  clearInterval(gameLoop);
  gameLoop = setInterval(gameloop, gameSpeed);
}

// Initialize game loop
let gameLoop = setInterval(gameloop, gameSpeed);


document.addEventListener('keydown', function(event) {
  if (event.key == "w" && movement !== "down") movement = "up";
  if (event.key == "a" && movement !== "right") movement = "left";
  if (event.key == "s" && movement !== "up") movement = "down";
  if (event.key == "d" && movement !== "left") movement = "right";
});
function start() {

  if (startCon == false){
    option.style.display = "none";
    button.style.display = "none";
    let i = 0;
    let j = 0;
    while (i < 10) {
      while (j < 10) {
        const id = i.toString() + j.toString();
        const gridItem = document.createElement("div");
        gridItem.id = id;
        gridItem.style.background = "rgb(20, 20, 20)";
        gridItem.style.border = "1px solid #222";
        gridItem.style.padding = "20px";
        gridItem.style.borderRadius = "5px";
        container.appendChild(gridItem);
        j += 1;
      }
      j = 0;
      i += 1;
    }
    startCon = true;
  }
  else {
    restart();
  }
  
}
function gameover(text){
  button.style.display = "inline-block";
  display.textContent = text;
  container.style.animation = "crash 0.5s linear";
  button.textContent = "Restart?";
  option.style.display = "inline";
}
function updateDisplay(){
  if (gameruntime){
    display.textContent = score;
  }
}
function move() {
  if (gameruntime) {
    let head = snakeBody[0];
    let newHead;

    if (movement == "right") {
      newHead = [head[0], head[1] + 1];
    }
    else if (movement == "left") {
      newHead = [head[0], head[1] - 1];
    }
    else if (movement == "up") {
      newHead = [head[0] - 1, head[1]];
    }
    else if (movement == "down") {
      newHead = [head[0] + 1, head[1]];
    }

    if (newHead[0] < 0 || newHead[0] >= 10 || newHead[1] < 0 || newHead[1] >= 10) {
      console.log("Game over");
      gameover("Game Over!");
      gameruntime = false;
      return;
    }

    for (let i = 1; i < snakeBody.length; i++) {
      if (newHead[0] === snakeBody[i][0] && newHead[1] === snakeBody[i][1]) {
        console.log("Game over - Snake collided with itself");
        gameruntime = false;
        gameover("Game over - Snake collided with itself")
        return;
      }
    }

    snakeBody.unshift(newHead);
    highlight(newHead[0], newHead[1]);

    if (snakeBody.length > snakeSize) {
      let tail = snakeBody.pop();
      remove(tail[0], tail[1]);
    }
    if (newHead[0] == rx && newHead[1] == ry){
      grow()
    }
  }
}
function highlight(i, j) {
  const currentDiv = document.getElementById(i.toString() + j.toString());
  currentDiv.style.background = snakeColor;
}

function remove(i, j) {
  const currentDiv = document.getElementById(i.toString() + j.toString());
  currentDiv.style.background = "rgb(20, 20, 20)";
}
function rNG(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function restart(){
  score = 1;
  option.style.display = "none";
  button.style.display = "none";
  gameruntime = true;
  movement = "right";
  snakeSize = 1;
  snakeBody = [[0, 0]];
  button.style.display = "none";
  remove(rx, ry);
  foodAvailable = false;
  container.style.animation = "";
  let i = 0;
  let j = 0;
    while (i < 10) {
      while (j < 10) {
        const id = i.toString() + j.toString();
        const currentDiv = document.getElementById(i.toString() + j.toString());
        currentDiv.style.background = "rgb(20, 20, 20)";
        j += 1;
      }
      j = 0;
      i += 1;
    }
}
function spawnFood(){
  if (!foodAvailable){
    do {
      rx = rNG(0, 9);
      ry = rNG(0, 9);
    } while (snakeBody.some(([sx, sy]) => sx === rx && sy === ry));
    document.getElementById(rx.toString() + ry.toString()).style.background = "red";
    foodAvailable = true;
  }
}
function grow(x, y){
  foodAvailable = false;
  snakeSize += 1;
  score += 1;
  console.log(rx, ry);
}

function gameloop() {
  if (startCon) {
    move();
    spawnFood();
    updateDisplay();
  }
}