class BaseBlock {
    constructor(x, y, w, h, label, canMove = true, action) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.label = label;
        this.isDragging = false;
        this.canMove = canMove;
        this.action = action;
        this.parent;

        this.width += textWidth(this.label);
    }

    get totalHeight() { return this.height };

    place(x, y) {
        this.x = x;
        this.y = y;
    }

    move(x, y) {
        this.x += x;
        this.y += y;
    }

    display() {
        fill(200);
        rect(this.x, this.y, this.width, this.height);
        fill(0);
        textAlign(CENTER, CENTER);
        text(this.label, this.x + this.width / 2, this.y + this.height / 2);
    }

    isMouseInside() {
        return mouseX > this.x && mouseX < this.x + this.width &&
            mouseY > this.y && mouseY < this.y + this.height;
    }
}