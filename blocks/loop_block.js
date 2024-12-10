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
        rect(this.x, this.y, this.width, this.height);
        fill(0);
        textAlign(CENTER, CENTER);
        text(this.label, this.x + this.width / 2, this.y + this.height / 2);
    }
}