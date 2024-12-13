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

        this.width = 255
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
        if (block.parent) {
            block.parent.removeChild(block)
        }
        if ((!this.condicion || this.condicion.constructor === ShadowBlock) && (block.constructor === BaseBlock || (block.constructor === ShadowBlock && draggingBlock.constructor === BaseBlock))) {
            let x = this.x + 125
            let y = this.y + (this.height - block.height) / 2;
            block.place(x, y);

            this.width += block.width - 100;
            this.condicion = block;
            block.parent = this;
            if (block.constructor !== ShadowBlock)
                this.canDrop = false
        } else {
            if (block.isShadow && this.condicion) {
                //block.hide = true
            }
        }

    }

    removeChild(block) {
        if (block == this.condicion) {
            this.width -= block.width - 100;
            this.condicion = null;
            block.parent = null;
            this.canDrop = true
        }
    }

    display() {
        fill(200);
        if (this.parent) fill(230)

        beginShape();
        vertex(this.x, this.y);  // Top-left corner

        vertex(this.x + 30, this.y); // Start of the top inward indent
        vertex(this.x + 50, this.y + 30); // Top inward indent peak
        vertex(this.x + 70, this.y); // End of the top inward indent

        vertex(this.x + this.width, this.y); // Top-right corner
        vertex(this.x + this.width, this.y + this.height); // Bottom-right corner

        vertex(this.x + 70, this.y + this.height); // Start of the bottom outward indent
        vertex(this.x + 50, this.y + this.height + 30); // Bottom outward indent peak
        vertex(this.x + 30, this.y + this.height); // End of the bottom outward indent

        vertex(this.x, this.y + this.height);  // Bottom-left corner
        endShape(CLOSE);

        if (!this.condicion) {
            rect(this.x + 100, this.y + 15, 125, this.height - 30);
        }

        fill(0);
        textAlign(CENTER, CENTER);
        text(this.label, this.x + this.labelWidth, this.y + this.height / 2);
    }
}