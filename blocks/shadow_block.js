class ShadowBlock {
    x = 500;
    y = 400;
    width = 170;
    height = 50;
    parent;
    hide = true
    isShadow = true

    place(x, y) {
        this.x = x;
        this.y = y;
    }

    display() {
        fill(60);
        rect(this.x, this.y, this.width, this.height);
    }
}