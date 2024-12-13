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

        this.height += 30;
        this.width = max(this.width, 100)
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
        if (this.parent) fill(230)

        beginShape();
        vertex(this.x, this.y);  // Top-left corner

        if (!this.parent || (this.parent && this.parent.condicion !== this)) {
            vertex(this.x + 30, this.y); // Start of the top inward indent
            vertex(this.x + 50, this.y + 30); // Top inward indent peak
            vertex(this.x + 70, this.y); // End of the top inward indent
        }

        vertex(this.x + this.width, this.y); // Top-right corner
        vertex(this.x + this.width, this.y + this.height); // Bottom-right corner

        if (!this.parent || (this.parent && this.parent.condicion !== this)) {
            vertex(this.x + 70, this.y + this.height); // Start of the bottom outward indent
            vertex(this.x + 50, this.y + this.height + 30); // Bottom outward indent peak
            vertex(this.x + 30, this.y + this.height); // End of the bottom outward indent
        }

        vertex(this.x, this.y + this.height);  // Bottom-left corner
        endShape(CLOSE);

        fill(0);
        textAlign(CENTER, CENTER);
        text(this.label, this.x + this.width / 2, this.y + this.height / 2);
    }

    isMouseInside(heightSurplus = 0) {
        const click = createVector(mouseX, mouseY).div(sf)
        return click.x > this.x && click.x < this.x + this.width &&
            click.y > this.y && click.y < this.y + this.height + heightSurplus;
    }
}