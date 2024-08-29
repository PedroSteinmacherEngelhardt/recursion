class Block {
    constructor(x, y, w, h, label, canMove = true, action) {
        this.x = x;
        this.y = y;
        this.width = w;
        this._height = h;
        this.label = label;
        this.isDragging = false;
        this.canMove = canMove;
        this.blocks = [];
        this.action = action;
        this.parent;

        this.width += textWidth(this.label)
    }

    get height() { return this._height };

    place(x, y) {
        this.x = x
        this.y = y
    }

    move(x, y) {
        this.x += x;
        this.y += y;
    }

    drop() { }

    display() {
        fill(200);
        rect(this.x, this.y, this.width, this._height);
        fill(0);
        text(this.label, this.x + 10, this.y + this._height / 2);
    }

    isMouseInside() {
        return mouseX > this.x && mouseX < this.x + this.width &&
            mouseY > this.y && mouseY < this.y + this._height;
    }
}