class Function {
    constructor(x, y, w, h, label, action) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

        this.label = label;
        this.isDragging = false;
        this.canMove = false;

        this.action = action;
        this.parent;

        this.blocks = [];

        this.width += textWidth(this.label)
    }

    drop(block) {
        this.blocks.push(block);
        this.positionBlocks()
        block.parent = this
    }

    positionBlocks() {
        let totalHeight = 0;
        for (let i = 0; i < this.blocks.length; i++) {
            let x = this.x + 10;
            let y = this.y + this.height + totalHeight;
            this.blocks[i].place(x, y)
            totalHeight += this.blocks[i].height;
        }
        if (this.parent) {
            this.parent.positionBlocks()
        }
    }

    removeBlock(block) {
        let index = this.blocks.indexOf(block);

        if (index !== -1) {
            this.blocks.splice(index, 1);
        } else return;

        this.positionBlocks()
    }

    display() {
        fill(250, 40, 40);
        rect(this.x, this.y, this.width, this.height);
        fill(0);
        text(this.label, this.x + 10, this.y + this.height / 2);
    }

    isMouseInside() {
        return mouseX > this.x && mouseX < this.x + this.width &&
            mouseY > this.y && mouseY < this.y + this.height;
    }
}