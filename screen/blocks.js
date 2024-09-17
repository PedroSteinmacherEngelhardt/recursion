class Blocks {
    blocks = [];
    dragging = null;

    prevMouseX = 0
    prevMouseY = 0

    nodes = []
    lines = []

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

        for (let l of this.lines) {
            line(l.x, l.y, l.x2, l.y2)
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
}

