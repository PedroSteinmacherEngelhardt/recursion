class Fibonacci extends Blocks {
    setup() {
        this.blocks.push(new FunctionBlock(500, 200, 20, 50, "contador(i)", true, () => print('hey')));
        this.blocks.push(new CondicionalBlock(500, 400, 20, 70, "if", true, () => "if"));
        this.blocks.push(new ReturnBlock(500, 400, 20, 70, "return", true, () => "return"));
        this.blocks.push(new ReturnBlock(500, 400, 20, 70, "return", true, () => "return"));
        this.blocks.push(new BaseBlock(900, 400, 20, 50, "i <= 1", true, (i) => i <= 1));
        this.blocks.push(new BaseBlock(1200, 400, 20, 50, "contador(i - 1) + contador(i - 2)", true, (i) => this.recursionPart(i - 1) + this.recursionPart(i - 2)));

        let button = createButton('click me');
        button.position(0, 100);

        this.blocks[0].drop(this.blocks[1]);
        this.blocks[1].drop(this.blocks[4])
        this.blocks[1].drop(this.blocks[2])
        this.blocks[0].drop(this.blocks[3])
        this.blocks[3].drop(this.blocks[5])

        button.mousePressed(() => {
            this.nodes = []; nodeX = 1200; nodeY = 400;
            let x = this.repaint(10)
            print(x);
        });
    }

    recursionPart(i) {
        let value = this.repaint(i);
        return value
    }

    repaint(i) {
        let mainBlock = this.blocks.find(b => b.label == "contador(i)")
        for (let b of mainBlock.children) {
            let result = b.action(i);
            if (result != undefined && result.type == "end") {
                return result.value
            }
        }
        return undefined;
    }

}