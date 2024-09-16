class CondicionalBlock extends FunctionBlock {
    constructor(x, y, w, h, label, canMove = true, action) {
        super(x, y, w + 10, h, label, canMove, action);

        this.condicion = null;

        this.action = (params) => {
            if (!this.condicion) {
                print("sem condicoes ...")
                return { type: "end", value: undefined }
            }
            else if (this.condicion.action(params)) {
                for (let block of this.children) {
                    let result = block.action(params);
                    if (result != undefined && result.type == "end") {
                        return result
                    }
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
            let x = this.x + this.width - 10; // - 10 de margem
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