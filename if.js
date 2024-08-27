class If {
    constructor(x, y, w, h, label, action, { canMove = true }) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.label = label;
        this.isDragging = false;
        this.canMove = canMove;
        this.blocks = [];
        this.action = action;
    }

    move(x, y) {
        x = x - this.width / 2;
        y = y - this.height / 2;

        for (let p of this.blocks) {
            p.x -= this.x - x;
            p.y -= this.y - y;
        }

        this.x = x;
        this.y = y;
    }

    drop(block) {
        block.x = this.x + this.width;
        block.y = this.y + (this.height - block.height) / 2;

        this.blocks.push(block);
        block.parent = this;
    }

    display() {
        fill(200);

        let w = 0;
        for (let b of this.blocks) {
            w += b.width;
        }

        rect(this.x, this.y, this.width + w, this.height);
        fill(0);
        text(this.label, this.x + 10, this.y + this.height / 2);
    }

    isMouseInside() {
        return mouseX > this.x && mouseX < this.x + this.width &&
            mouseY > this.y && mouseY < this.y + this.height;
    }
}