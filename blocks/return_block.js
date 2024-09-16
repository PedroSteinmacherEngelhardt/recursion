class ReturnBlock extends BaseBlock {
    constructor(x, y, w, h, label, canMove = true, action) {
        super(x, y, w, h, label, canMove, action);

        this.condicion = null;

        this.action = (i, x, y) => {
            if (this.condicion) {
                let result = this.condicion.action(i, x, y)
                return {
                    type: "end",
                    value: result,
                }
            }
            else {
                return {
                    type: "end",
                    value: i,
                }
            }
        };

        this.width += textWidth(this.label)
    }

    place(x, y) {
        if (this.condicion) {
            this.condicion.move(
                x - this.x,
                y - this.y
            )
        }
        super.place(x, y);
    }

    move(x, y) {
        if (this.condicion) {
            this.condicion.move(x, y)
        }
        super.move(x, y)
    }

    drop(block) {
        if (!this.condicion && !(block instanceof FunctionBlock)) { // CONDICION PROBABLY GONNA BREAK IN THE FUTURE !!!
            let x = this.x + this.width - 10;
            let y = this.y + (this.height - block.height) / 2;
            block.place(x, y);

            this.width += block.width;

            this.condicion = block;
            block.parent = this;

        } else {
            super.drop(block)
        }

    }

    removeChild(block) {
        if (block == this.condicion) {
            this.width -= block.width;
            this.condicion = null;
            block.parent = null;
        }
        else {
            super.removeChild(block)
        }
    }

    display() {
        fill(200);
        rect(this.x, this.y, this.width, this.height);
        fill(0);
        text(this.label, this.x + 10, this.y + this.height / 2);
    }

    isMouseInside() {
        return mouseX > this.x && mouseX < this.x + this.width &&
            mouseY > this.y && mouseY < this.y + this.height;
    }
}