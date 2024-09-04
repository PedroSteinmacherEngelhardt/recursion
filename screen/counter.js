class Counter {
    blocks = [];
    dragging = null;

    prevMouseX = 0
    prevMouseY = 0

    nodes = []

    setup() {
        this.blocks.push(new FunctionBlock(500, 200, 20, 50, "contador(i)", true, () => print('hey')));
        this.blocks.push(new CondicionalBlock(500, 400, 20, 70, "if", true, () => "if"));
        this.blocks.push(new BaseBlock(900, 400, 20, 50, "i <= 10", true, (i) => i <= 10));
        this.blocks.push(new BaseBlock(1200, 400, 20, 50, "contador(i + 1)", true, (i) => this.recursionPart(i)));

        let button = createButton('click me');
        button.position(0, 100);

        button.mousePressed(() => {
            //setScreen(new Menu)
            this.nodes = []; nodeX = 1200; nodeY = 400; this.repaint(0);
        });
    }

    draw() {
        background(200);
        for (let block of this.blocks) {
            block.display();
        }

        cursor(ARROW);
        if (this.dragging) {
            cursor(MOVE);
        } else {
            for (let block of this.blocks.slice().reverse()) {
                if (block.isMouseInside() && block.canMove) {
                    cursor(HAND);
                    break;
                }
            }
        }

        for (let n of this.nodes) {
            fill(255)
            ellipse(n.x, n.y, 20)
            fill(0)
            text(n.num, n.x - 5, n.y + 5)
        }

        this.prevMouseX = mouseX;
        this.prevMouseY = mouseY;

        let fps = frameRate();
        text(fps, 50, 50);
    }

    mousePressed() {
        for (let block of this.blocks.slice().reverse()) {
            if (block.isMouseInside() && block.canMove) {
                block.isDragging = true;
                this.dragging = block;

                if (block.parent) {
                    block.parent.removeChild(block);
                    block.parent = null // important !!!
                }

                let index = this.blocks.indexOf(block);
                this.blocks.splice(index, 1);
                this.blocks.push(block);
                if (block.condicion) {
                    let index = this.blocks.indexOf(block.condicion);
                    this.blocks.splice(index, 1);
                    this.blocks.push(block.condicion);
                }

                break;
            }
        }
    }

    mouseDragged() {
        if (this.dragging) {
            this.dragging.move(
                mouseX - this.dragging.width / 2 - this.dragging.x,
                mouseY - this.dragging.height / 2 - this.dragging.y
            );
        }
        else {
            for (let block of this.blocks) {
                block.x -= this.prevMouseX - mouseX
                block.y -= this.prevMouseY - mouseY
            }
        }
    }

    mouseReleased() {
        if (!this.dragging) return;

        for (let otherBlock of this.blocks.slice().reverse()) {
            if (otherBlock == this.dragging || otherBlock == this.dragging.condicion) {
                continue;
            }
            if (otherBlock.parent) {
                if (otherBlock == otherBlock.parent.condicion) {
                    continue
                }
            }
            if (otherBlock.isMouseInside()) {
                otherBlock.drop(this.dragging)
                break;
            }
        }

        this.dragging.isDragging = false;
        this.dragging = null;
    }

    async recursionPart(i) {
        this.nodes.push({
            x: nodeX,
            y: nodeY,
            num: i,
        })
        nodeY -= 25;
        await sleep(100);
        this.repaint(i + 1);
    }

    repaint(i) {
        let mainBlock = this.blocks.find(b => b.label == "contador(i)")
        for (let b of mainBlock.children) {
            let result = b.action(i);
            if (result == "end") return;
        }
    }

}

