function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  setScreen(new LevelSelector, false)
  angleMode(DEGREES)
}

let nodeX = 1200;
let nodeY = 400;

function draw() {
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
  return;
}

function touchEnded() {
  mouseReleased()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

const dialog = [
  ` <p>🎮 <strong>Mentor Virtual</strong>: Olá, jogador! Bem-vindo ao fantástico mundo da <strong>recursão</strong>! 🎉</p>
      <p>Hoje vamos aprender sobre funções recursivas e como usá-las para resolver problemas. Antes de começar sua missão, vou explicar o que elas são, como funcionam e por que são tão úteis.</p>
      
      <h3>O que é uma função recursiva?</h3>
      <p>Uma <strong>função recursiva</strong> é uma função que <em>se chama a si mesma</em> enquanto resolve partes menores de um problema maior. Imagine um quebra-cabeça grande que você resolve peça por peça até terminar.</p>
      `,
  `<h3>Para que servem funções recursivas?</h3>
      <p>Funções recursivas são ótimas para resolver problemas que podem ser divididos em partes menores e semelhantes. Alguns exemplos incluem:</p>
      <ul>
        <li><strong>Estruturas repetitivas:</strong> Contar números ou repetir ações.</li>
        <li><strong>Problemas hierárquicos:</strong> Explorar árvores genealógicas ou diretórios no computador.</li>
        <li><strong>Cálculos matemáticos:</strong> Como o fatorial de um número (ex.: <code>5! = 5 × 4 × 3 × 2 × 1</code>).</li>
        <li><strong>Desafios complexos:</strong> Resolver labirintos ou encontrar o menor caminho entre dois pontos.</li>
      </ul>
`,
]

let dialogIndex = 0

const dialogBox = document.getElementById('dialog')
const dialogContent = document.getElementById('dialogcontent')
dialogContent.innerHTML = dialog[dialogIndex]
dialogBox.style.cursor = 'pointer';

dialogBox.onmouseover = function () {
  if (!dialogIndex >= dialog.length - 1)
    this.style.backgroundColor = '#ddddddc0';
};
dialogBox.onmouseout = function () {
  this.style.backgroundColor = '';
};

function passDialog() {
  event.stopPropagation();
  if (dialogIndex + 1 > dialog.length - 1) {
    return
  }
  dialogIndex += 1
  dialogContent.innerHTML = dialog[dialogIndex]
}

function goBackDialog() {
  event.stopPropagation();
  if (dialogIndex - 1 < 0) {
    return
  }
  dialogIndex -= 1
  dialogContent.innerHTML = dialog[dialogIndex]
}