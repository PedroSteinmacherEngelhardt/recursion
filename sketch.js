let blocks = [];
let dragging = null;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  blocks.push(new MainFunciton(500, 200, 20, 50, "contador(i)", false));
  blocks.push(new If(500, 400, 20, 70, "if", true, () => console.log("print")));
  blocks.push(new Block(900, 400, 20, 50, "return fibonacci(n - 1) + fibonacci(n - 2);", true, () => { return "end" }));

  for (let block of blocks) {
    block.width += textWidth(block.label)
  }

  let button = createButton('click me');
  button.position(0, 100);

  button.mousePressed(repaint);
}

function repaint() {
  // let mainBlock = blocks.find(b => b.label == "contador(i)")

  // for (let b of mainBlock.blocks) {
  //   let result = b.action.call();
  //   if (result == "end") return;
  // }
  // console.log("end")
}

function draw() {
  background(200);
  for (let block of blocks) {
    block.display();
  }
}

function mousePressed() {
  for (let block of blocks.slice().reverse()) {
    if (block.isMouseInside() && block.canMove) {
      block.isDragging = true;
      dragging = block;

      if (block.parent) {
        let index = block.parent.blocks.indexOf(block);
        if (index !== -1) {
          block.parent.blocks.splice(index, 1);
        }
      }

      break;
    }
  }
}

function mouseDragged() {
  if (dragging) {
    dragging.move(mouseX, mouseY);
  }
}


function mouseReleased() {
  if (!dragging) return;

  for (let otherBlock of blocks.slice().reverse()) {
    if (otherBlock == dragging) {
      continue;
    }
    if (otherBlock.isMouseInside()) {
      otherBlock.drop(dragging)
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
