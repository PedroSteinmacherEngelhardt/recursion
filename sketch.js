let sf = 0.5

async function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  setScreen(new Blocks, false)
  await sleep(100)
  setScreen(new LevelSelector, false)
  angleMode(DEGREES)
}

function draw() {
  scale(sf);
  if (currentScreen && currentScreen.draw)
    currentScreen.draw();
  return;
}

function mousePressed() {
  if (isInsedeDisplayCnv()) return
  if (currentScreen && currentScreen.mousePressed)
    currentScreen.mousePressed();
  return;
}

function touchStarted(event) {
  mousePressed()
}

function mouseDragged() {
  if (isInsedeDisplayCnv()) return
  if (currentScreen && currentScreen.mouseDragged)
    currentScreen.mouseDragged();
  return;
}

function touchMoved() {
  mouseDragged()
  return false
}

function mouseReleased() {
  if (isInsedeDisplayCnv()) return
  if (currentScreen && currentScreen.mouseReleased)
    currentScreen.mouseReleased();
  draggingBlock = null
  return;
}

function touchEnded() {
  mouseReleased()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

draggingBlock = null


const startMenu = document.getElementById('menu')
const levelSelectorMenu = document.getElementById('level')
const menuContainer = document.getElementById('menu-container')

let dialog = []
let dialogIndex = 0

const dialogBox = document.getElementById('dialog')
const dialogContent = document.getElementById('dialogcontent')
const dialogCount = document.getElementById('dialogCount')

dialogBox.onmouseover = function () {
  if (!dialogIndex >= dialog.length - 1)
    this.style.backgroundColor = '#ddddddc0';
};
dialogBox.onmouseout = function () {
  this.style.backgroundColor = '';
};

