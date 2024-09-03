let blocks = [];
let dragging = null;

let prevMouseX = 0
let prevMouseY = 0

let nodes = []

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  blocks.push(new FunctionBlock(500, 200, 20, 50, "contador(i)", true, () => print('hey')));
  blocks.push(new CondicionalBlock(500, 400, 20, 70, "if", true, () => "if"));
  blocks.push(new BaseBlock(900, 400, 20, 50, "i <= 10", true, (i) => i <= 10));
  blocks.push(new BaseBlock(1200, 400, 20, 50, "contador(i + 1)", true, (i) => recursionPart(i)));

  let button = createButton('click me');
  button.position(0, 100);

  button.mousePressed(() => { nodes = []; nodeX = 1200; nodeY = 400; repaint(0); });
}

let nodeX = 1200;
let nodeY = 400;

async function recursionPart(i) {
  nodes.push({
    x: nodeX,
    y: nodeY,
    num: i,
  })
  nodeY -= 25;
  await sleep(100);
  repaint(i + 1);
}

function repaint(i) {
  let mainBlock = blocks.find(b => b.label == "contador(i)")
  for (let b of mainBlock.children) {
    let result = b.action(i);
    if (result == "end") return;
  }
}

function draw() {
  background(200);
  for (let block of blocks) {
    block.display();
  }

  cursor(ARROW);
  if (dragging) {
    cursor(MOVE);
  } else {
    for (let block of blocks.slice().reverse()) {
      if (block.isMouseInside() && block.canMove) {
        cursor(HAND);
        break;
      }
    }
  }

  for (let n of nodes) {
    fill(255)
    ellipse(n.x, n.y, 20)
    fill(0)
    text(n.num, n.x - 5, n.y + 5)
  }

  prevMouseX = mouseX;
  prevMouseY = mouseY;

  let fps = frameRate();
  text(fps, 50, 50);
}

function mousePressed() {
  for (let block of blocks.slice().reverse()) {
    if (block.isMouseInside() && block.canMove) {
      block.isDragging = true;
      dragging = block;

      if (block.parent) {
        block.parent.removeChild(block);
        block.parent = null // important !!!
      }

      let index = blocks.indexOf(block);
      blocks.splice(index, 1);
      blocks.push(block);
      if (block.condicion) {
        let index = blocks.indexOf(block.condicion);
        blocks.splice(index, 1);
        blocks.push(block.condicion);
      }

      break;
    }
  }
}

function mouseDragged() {
  if (dragging) {
    dragging.move(
      mouseX - dragging.width / 2 - dragging.x,
      mouseY - dragging.height / 2 - dragging.y
    );
  }
  else {
    for (let block of blocks) {
      block.x -= prevMouseX - mouseX
      block.y -= prevMouseY - mouseY
    }
  }
}


function mouseReleased() {
  if (!dragging) return;

  for (let otherBlock of blocks.slice().reverse()) {
    if (otherBlock == dragging || otherBlock == dragging.condicion) {
      continue;
    }
    if (otherBlock.parent) {
      if (otherBlock == otherBlock.parent.condicion) {
        continue
      }
    }
    if (otherBlock.isMouseInside()) {
      otherBlock.drop(dragging)
      break;
    }
  }

  dragging.isDragging = false;
  dragging = null;

}

function removeBlock(block) {
  let index = blocks.indexOf(block);
  if (index !== -1) {
    blocks.splice(index, 1);
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}