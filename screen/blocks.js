class Blocks {
    blocks = [];
    dragging = null;
    mainBlock

    prevMouseX = 0
    prevMouseY = 0

    shadowBlock = new ShadowBlock()
    actionButton
    goBackButton

    iterations = 0

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

    restX = 0
    restY = 0

    mousePressed() {
        for (let block of this.blocks.slice().reverse()) {
            if (block.isMouseInside() && block.canMove) {
                block.isDragging = true;
                this.dragging = block;
                draggingBlock = block
                this.restX = mouseX - this.dragging.x
                this.restY = mouseY - this.dragging.y

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
                mouseX - this.restX - this.dragging.x,
                mouseY - this.restY - this.dragging.y
            );
        }
        else {
            for (let block of this.blocks) {
                block.x -= this.prevMouseX - mouseX
                block.y -= this.prevMouseY - mouseY
            }
        }

        if (this.dragging) {
            let hideShadow = true
            for (let otherBlock of this.blocks.slice().reverse()) {
                if (otherBlock == this.dragging || otherBlock == this.dragging.condicion) {
                    continue;
                }
                if (otherBlock.parent) {
                    if (otherBlock == otherBlock.parent.condicion) {
                        continue
                    }
                }
                if (otherBlock.isMouseInside(otherBlock.totalHeight)) {
                    if (otherBlock.parent) {
                        let index = otherBlock.parent.children.indexOf(otherBlock)
                        if (mouseY - otherBlock.y < otherBlock.height / 4) {
                            this.shadowBlock.hide = false
                            otherBlock.parent.drop(this.shadowBlock, index)
                            break
                        }

                        if (mouseX - otherBlock.x < otherBlock.width / 4) {
                            this.shadowBlock.hide = false
                            otherBlock.parent.drop(this.shadowBlock, index + 1)
                            break
                        }

                        if (!otherBlock.canDrop) {
                            this.shadowBlock.hide = false
                            otherBlock.parent.drop(this.shadowBlock)
                        }
                    }

                    if (otherBlock.drop) {
                        if (mouseY - otherBlock.y > otherBlock.height * 3 / 4 && mouseY - otherBlock.y < otherBlock.height) {
                            this.shadowBlock.hide = false
                            otherBlock.drop(this.shadowBlock, 0)
                            break
                        }
                        if (mouseY - otherBlock.y > otherBlock.height) {
                            this.shadowBlock.hide = false
                            otherBlock.drop(this.shadowBlock, otherBlock.children.length)
                            hideShadow = false
                            continue
                        }
                        this.shadowBlock.hide = false
                        otherBlock.drop(this.shadowBlock)
                        break
                    }
                    break;
                } else {
                    if (hideShadow) {
                        if (this.shadowBlock.parent) this.shadowBlock.parent.removeChild(this.shadowBlock)
                        this.shadowBlock.hide = true
                    }
                }
            }
        }
    }

    mouseReleased() {
        if (this.shadowBlock.parent) this.shadowBlock.parent.removeChild(this.shadowBlock)
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
            if (otherBlock.isMouseInside(otherBlock.totalHeight)) {
                if (otherBlock.parent) {
                    let index = otherBlock.parent.children.indexOf(otherBlock)
                    if (mouseY - otherBlock.y < otherBlock.height / 4) {
                        otherBlock.parent.drop(this.dragging, index)
                        break
                    }

                    if (mouseX - otherBlock.x < otherBlock.width / 4) {
                        otherBlock.parent.drop(this.dragging, index + 1)
                        break
                    }

                    if (!otherBlock.canDrop) {
                        otherBlock.parent.drop(this.dragging)
                    }
                }

                if (otherBlock.drop) {
                    if (mouseY - otherBlock.y > otherBlock.height * 3 / 4 && mouseY - otherBlock.y < otherBlock.height) {
                        otherBlock.drop(this.dragging, 0)
                        break
                    }
                    if (mouseY - otherBlock.y > otherBlock.height) {
                        otherBlock.drop(this.dragging, otherBlock.children.length)
                        continue
                    }
                    otherBlock.drop(this.dragging)
                }
                break;
            }
        }

        this.dragging.isDragging = false;
        this.dragging = null;
        draggingBlock = null
    }

    async repaint(params) {
        this.iterations += 1
        if (this.iterations >= 1000) {
            print("limite de iterações chegado")
            return
        }
        for (let b of this.mainBlock.children) {
            let result = await b.action(params);
            if (result != undefined && result.type == "end") {
                return result.value
            }
        }
        return undefined;
    }
}

