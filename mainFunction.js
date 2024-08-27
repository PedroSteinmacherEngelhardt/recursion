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
    }

    drop(block) {
        block.x = this.x + 10;
        block.y = this.y + block.height * (this.blocks.length + 1);
        this.blocks.push(block);
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