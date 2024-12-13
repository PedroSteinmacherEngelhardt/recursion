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
            this.displayWhileDragging(this.dragging)
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


        this.prevMouseX = mouseX / sf;
        this.prevMouseY = mouseY / sf;
    }

    displayWhileDragging(block) {
        if (!block.children) return
        for (const b of block.children) {
            b.display()
            if (b.condicion) {
                b.condicion.display()
            }

            if (b.children && b.children.length > 0) {
                this.displayWhileDragging(b)
            }
        }
    }

    restX = 0
    restY = 0

    mousePressed() {
        const click = createVector(mouseX, mouseY).div(sf)
        for (let block of this.blocks.slice().reverse()) {
            if (block.isMouseInside() && block.canMove) {
                block.isDragging = true;
                this.dragging = block;
                draggingBlock = block
                this.restX = click.x - this.dragging.x
                this.restY = click.y - this.dragging.y

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
                if (!block.children) break
                this.displayOnTop(block)

                break;
            }
        }
    }

    displayOnTop(block) {
        for (const b of block.children) {
            let index = this.blocks.indexOf(b);
            this.blocks.splice(index, 1);
            this.blocks.push(b);
            if (b.condicion) {
                let index = this.blocks.indexOf(b.condicion);
                this.blocks.splice(index, 1);
                this.blocks.push(b.condicion);
            }

            if (b.children && b.children.length > 0) {
                this.displayOnTop(b)
            }
        }
    }

    mouseDragged() {
        const click = createVector(mouseX, mouseY).div(sf)
        if (this.dragging) {
            this.dragging.move(
                click.x - this.restX - this.dragging.x,
                click.y - this.restY - this.dragging.y
            );
        }
        else {
            for (let block of this.blocks) {
                block.x -= this.prevMouseX - click.x
                block.y -= this.prevMouseY - click.y
            }
        }

        if (this.dragging) {
            let hideShadow = true
            for (let otherBlock of this.blocks.slice().reverse()) {
                if (!this.shadowBlock.hide && this.shadowBlock.isMouseInside()) break
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
                        if (click.y - otherBlock.y < otherBlock.height / 4) {
                            this.shadowBlock.hide = false
                            otherBlock.parent.drop(this.shadowBlock, index)
                            break
                        }

                        if (click.x - otherBlock.x < 30) {
                            this.shadowBlock.hide = false
                            otherBlock.parent.drop(this.shadowBlock, index + 1)
                            break
                        }

                        if (!otherBlock.canDrop) {
                            this.shadowBlock.hide = false
                            otherBlock.parent.drop(this.shadowBlock, index + 1)
                            break
                        }
                    }

                    if (otherBlock.drop) {
                        if (click.y - otherBlock.y > otherBlock.height * 3 / 4 && click.y - otherBlock.y < otherBlock.height) {
                            this.shadowBlock.hide = false
                            otherBlock.drop(this.shadowBlock, 0)
                            break
                        }
                        if (click.y - otherBlock.y > otherBlock.height) {
                            let index = 0
                            if (otherBlock.children)
                                index = otherBlock.children.length
                            let h = 0
                            const mouseHeight = click.y - otherBlock.y - otherBlock.height

                            for (const i in otherBlock.children) {
                                if (mouseHeight <= (otherBlock.children[i].totalHeight / 2) + h) {
                                    index = i
                                    break
                                }
                                h += otherBlock.children[i].totalHeight
                            }

                            this.shadowBlock.hide = false
                            otherBlock.drop(this.shadowBlock, index)
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
                        this.shadowBlock.parent = null
                        this.shadowBlock.hide = true
                    }
                }
            }

            if (!this.shadowBlock.parent) {
                this.shadowBlock.hide = true
            }
        }
    }

    mouseReleased() {
        if (!this.dragging) return;

        if (!this.shadowBlock.hide && this.shadowBlock.parent) {
            this.dragging.parent = this.shadowBlock.parent
            let index = 0
            if (this.shadowBlock.parent.children) index = this.shadowBlock.parent.children.indexOf(this.shadowBlock)
            if (this.shadowBlock.parent) this.shadowBlock.parent.removeChild(this.shadowBlock)
            this.shadowBlock.parent = null
            this.shadowBlock.hide = true
            this.dragging.parent.drop(this.dragging, index)
        }


        this.dragging.isDragging = false;
        this.dragging = null;
        draggingBlock = null
    }

    async repaint(params) {
        this.iterations += 1
        if (this.iterations >= 500) {
            circles = {};
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

