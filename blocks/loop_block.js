class LoopBlock extends FunctionBlock {
    constructor(x, y, w, h, label, canMove = true, action, loopOver) {
        super(x, y, w, h, label, canMove, action);

        this.children = [];

        this.action = async (param) => {
            param = loopOver(param)
            if (!param) return
            for (let item of param) {
                for (let block of this.children) {
                    let result = await block.action(item);
                    if (result != undefined && result.type == "end") {
                        return result
                    }
                }
            }
        }
    }

    display() {
        fill(200);
        if (this.parent) fill(230)

        beginShape();
        vertex(this.x, this.y);  // Top-left corner
        vertex(this.x + 30, this.y); // Start of the top inward indent
        vertex(this.x + 50, this.y + 30); // Top inward indent peak
        vertex(this.x + 70, this.y); // End of the top inward indent
        vertex(this.x + this.width, this.y); // Top-right corner
        vertex(this.x + this.width, this.y + this.height); // Bottom-right corner
        vertex(this.x + 110, this.y + this.height); // Start of the bottom outward indent
        vertex(this.x + 90, this.y + this.height + 30); // Bottom outward indent peak
        vertex(this.x + 70, this.y + this.height); // End of the bottom outward indent


        vertex(this.x + 70, this.y + this.totalHeight); // Start of the bottom outward indent
        vertex(this.x + 50, this.y + this.totalHeight + 30); // Bottom outward indent peak
        vertex(this.x + 30, this.y + this.totalHeight); // End of the bottom outward indent

        vertex(this.x, this.y + this.totalHeight);  // Bottom-left corner
        endShape(CLOSE);

        fill(0);
        textAlign(CENTER, CENTER);
        text(this.label, this.x + this.width / 2, this.y + this.height / 2);
    }
}