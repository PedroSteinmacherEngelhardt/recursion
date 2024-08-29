class If {
    constructor(x, y, w, h, label, canMove = true, action) {
        this.x = x;
        this.y = y;
        this.width = w;
        this._height = h;
        this.label = label;
        this.isDragging = false;
        this.canMove = canMove;
        this.blocks = [];
        this.condicion = null;
        this.action = (i) => {
            if (!this.condicion) {
                print("sem condicoes ...")
                return "end"
            }
            if (this.condicion.action.call(null, i)) {
                for (let block of this.blocks) {
                    block.action.call(null, i);
                }
            }
        };

        this.width += textWidth(this.label)
    }

    get height() {
        let h = 0;
        for (let block of this.blocks) {
            h += block.height;
        }
        return this._height + h;
    }

    place(x, y) {
        for (let p of this.blocks) {
            p.move(
                x - this.x,
                y - this.y
            )
        }
        if (this.condicion) {
            this.condicion.move(
                x - this.x,
                y - this.y
            )
        }

        this.x = x;
        this.y = y;
    }

    move(x, y) {
        for (let p of this.blocks) {
            p.move(x, y)
        }
        if (this.condicion) {
            this.condicion.move(x, y)
        }

        this.x += x;
        this.y += y;
    }

    drop(block) {
        if (!this.condicion && block instanceof Block) { // CONDICION PROBABLY GONNA BREAK IN THE FUTURE !!!
            let x = this.x + this.width;
            let y = this.y + (this._height - block.height) / 2;
            block.place(x, y);

            this.width += block.width;

            this.condicion = block;
            block.parent = this;

        } else {
            this.blocks.push(block);
            this.positionBlocks();
            block.parent = this
        }

    }

    positionBlocks() {
        let totalHeight = 0;
        for (let i = 0; i < this.blocks.length; i++) {
            let x = this.x + 10;
            let y = this.y + this._height + totalHeight;
            this.blocks[i].place(x, y)
            totalHeight += this.blocks[i].height;
        }
        if (this.parent) {
            this.parent.positionBlocks()
        }
    }

    removeBlock(block) {
        if (block == this.condicion) {
            this.width -= block.width;
            this.condicion = null;
            block.parent = null;
        }
        else {
            let index = this.blocks.indexOf(block);

            if (index !== -1) {
                this.blocks.splice(index, 1);
            } else return;

            this.positionBlocks()
        }
    }

    display() {
        fill(200);
        rect(this.x, this.y, this.width + 10, this._height);
        fill(0);
        text(this.label, this.x + 10, this.y + this._height / 2);
    }

    isMouseInside() {
        return mouseX > this.x && mouseX < this.x + this.width &&
            mouseY > this.y && mouseY < this.y + this._height;
    }
}