class If {
    constructor(x, y, w, h, label, canMove = true, action) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.label = label;
        this.isDragging = false;
        this.canMove = canMove;
        this.blocks = [];
        this.action = action;

        this.width += textWidth(this.label)
    }

    move(x, y) {
        for (let p of this.blocks) {
            p.x -= this.x - x;
            p.y -= this.y - y;
        }

        this.x = x;
        this.y = y;
    }

    drop(block) {
        let x = this.x + this.width;
        let y = this.y + (this.height - block.height) / 2;

        block.move(x, y);

        this.blocks.push(block);
        block.parent = this;
    }

    display() {
        fill(200);

        let w = 0;
        for (let b of this.blocks) {
            w += b.width;
        }

        rect(this.x, this.y, this.width + w + 10, this.height);
        fill(0);
        text(this.label, this.x + 10, this.y + this.height / 2);
    }

    isMouseInside() {
        return mouseX > this.x && mouseX < this.x + this.width &&
            mouseY > this.y && mouseY < this.y + this.height;
    }
}