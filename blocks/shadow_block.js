class ShadowBlock extends BaseBlock {
    constructor() {
        super();
        this.x = 500;
        this.y = 400;
        this.width = 170;
        this.height = 50;
        this.parent;
        this.hide = true
        this.isShadow = true
    }

    display() {
        fill(60);
        rect(this.x, this.y, this.width, this.height);
    }

    isMouseInside(_) {
        return false;
    }
}