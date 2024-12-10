class ReturnBlock extends BaseBlock {
    constructor(x, y, w, h, label, canMove = true, action) {
        super(x, y, w, h, label, canMove, action);

        this.condicion = null;

        this.action = (params) => {
            if (this.condicion) {
                let result = this.condicion.action(params)
                return {
                    type: "end",
                    value: result,
                }
            }
            else {
                return {
                    type: "end",
                    value: undefined,
                }
            }
        };

        this.width += textWidth(this.label)
        this.labelWidth = textWidth(this.label)
        this.canDrop = true
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
        if (!this.condicion && (block.constructor === BaseBlock || block.constructor === ShadowBlock)) {
            let x = this.x + this.width - 10;
            let y = this.y + (this.height - block.height) / 2;
            block.place(x, y);

            if (block.isShadow) { return }

            this.width += block.width;
            this.condicion = block;
            block.parent = this;
            this.canDrop = false
        }

    }

    removeChild(block) {
        if (block == this.condicion) {
            this.width -= block.width;
            this.condicion = null;
            block.parent = null;
            this.canDrop = true
        }
    }

    display() {
        fill(200);
        if (this.parent) fill(230)
        rect(this.x, this.y, this.width, this.height);
        fill(0);
        textAlign(CENTER, CENTER);
        text(this.label, this.x + this.labelWidth, this.y + this.height / 2);
    }

    isMouseInside() {
        return mouseX > this.x && mouseX < this.x + this.width &&
            mouseY > this.y && mouseY < this.y + this.height;
    }
}