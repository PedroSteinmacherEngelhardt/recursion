class Blocks {
    blocks = [];
    dragging = null;
    mainBlock

    prevMouseX = 0
    prevMouseY = 0

    shadowBlock = new ShadowBlock()
    actionButton
    goBackButton

    setup(doButtons = false) {
        if (!doButtons) { return }
        this.actionButton = createButton('Executar função');
        this.actionButton.position(cnvPosition.x, height * 0.7);

        this.goBackButton = createButton('voltar');
        this.goBackButton.position(cnvPosition.x + cnvSize.width - 100, height * 0.7);

        this.goBackButton.mousePressed(() => {
            this.goBackButton.remove()
            this.actionButton.remove()
            goToMenu()
        });
    }

    draw() {
        textAlign(CENTER, CENTER);
        stroke(0);
        strokeWeight(1);
        textSize(24);
        clear();
        for (let block of this.blocks) {
            block.display();
        }

        if (!this.shadowBlock.hide) {
            this.shadowBlock.display()
        }

        if (this.dragging) {
            this.dragging.display()
            if (this.dragging.condicion) {
                this.dragging.condicion.display()
            }
            if (this.dragging.children) {
                for (const b of this.dragging.children) { b.display() }
            }
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


        this.prevMouseX = mouseX;
        this.prevMouseY = mouseY;
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

        if (this.dragging) {
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
                    if (otherBlock.drop) {
                        this.shadowBlock.hide = false
                        otherBlock.drop(this.shadowBlock)
                    }
                    break;
                } else {
                    this.shadowBlock.hide = true
                }
            }
        }
    }

    mouseReleased() {
        this.shadowBlock.hide = true
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
                if (otherBlock.drop) {
                    otherBlock.drop(this.dragging)
                }
                break;
            }
        }

        this.dragging.isDragging = false;
        this.dragging = null;
    }

    async repaint(params) {
        for (let b of this.mainBlock.children) {
            let result = await b.action(params);
            if (result != undefined && result.type == "end") {
                return result.value
            }
        }
        return undefined;
    }
}

