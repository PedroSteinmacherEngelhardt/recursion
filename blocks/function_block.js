class FunctionBlock extends BaseBlock {
    constructor(x, y, w, h, label, canMove = true, action) {
        super(x, y, w, h, label, canMove, action);

        this.children = [];
        this.childrenOffset = 40
        this.canDrop = true
    }

    get totalHeight() {
        let h = 0;
        for (let block of this.children) {
            h += block.totalHeight;
        }
        return this.height + h;
    };

    place(x, y) {
        for (let p of this.children) {
            p.move(
                x - this.x,
                y - this.y
            )
        }
        super.place(x, y);
    }

    move(x, y) {
        for (let p of this.children) {
            p.move(x, y)
        }
        super.move(x, y);
    }

    drop(block, index = 0) {
        if (block.parent) {
            block.parent.removeChild(block)
        }
        this.children.splice(index, 0, block);
        this.repositionChildren()
        block.parent = this
    }

    repositionChildren() {
        let totalHeight = 0;
        for (let i = 0; i < this.children.length; i++) {
            let x = this.x + this.childrenOffset;
            let y = this.y + this.height + totalHeight;
            this.children[i].place(x, y)
            totalHeight += this.children[i].totalHeight;
        }
        if (this.parent) {
            this.parent.repositionChildren()
        }
    }

    removeChild(block) {
        let index = this.children.indexOf(block);

        if (index !== -1) {
            this.children.splice(index, 1);
        } else return;

        this.repositionChildren()
    }

    display() {
        fill(250, 40, 40);

        beginShape();
        vertex(this.x, this.y);  // Top-left corner

        vertex(this.x + this.width, this.y); // Top-right corner
        vertex(this.x + this.width, this.y + this.height); // Bottom-right corner
        vertex(this.x + 110, this.y + this.height); // Start of the bottom outward indent
        vertex(this.x + 90, this.y + this.height + 30); // Bottom outward indent peak
        vertex(this.x + 70, this.y + this.height); // End of the bottom outward indent
        vertex(this.x, this.y + this.height);  // Bottom-left corner
        endShape(CLOSE);

        fill(0);
        textAlign(CENTER, CENTER);
        text(this.label, this.x + this.width / 2, this.y + this.height / 2);
    }
}