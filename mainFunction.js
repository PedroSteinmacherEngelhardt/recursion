class MainFunciton {
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
        let totalHeight = 0;
        for (let i = 0; i < this.blocks.length; i++) {
            totalHeight += this.blocks[i].height;
        }

        let x = this.x + 10;
        let y = this.y + this.height + totalHeight;
        block.move(x, y)

        this.blocks.push(block);
        block.parent = this
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