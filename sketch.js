function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  setScreen(new LevelSelector)
}

let nodeX = 1200;
let nodeY = 400;

function draw() {
  if (currentScreen && currentScreen.draw)
    currentScreen.draw();
  return;
}

function mousePressed() {
  if (currentScreen && currentScreen.mousePressed)
    currentScreen.mousePressed();
  return;
}

function touchStarted(event) {
  mousePressed()
}

function mouseDragged() {
  if (currentScreen && currentScreen.mouseDragged)
    currentScreen.mouseDragged();
  return;
}

function touchMoved() {
  mouseDragged()
  return false
}

function mouseReleased() {
  if (currentScreen && currentScreen.mouseReleased)
    currentScreen.mouseReleased();
  return;
}

function touchEnded() {
  mouseReleased()
}