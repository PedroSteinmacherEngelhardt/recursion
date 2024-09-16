class Fibonacci extends Blocks {
    setup() {
        this.blocks.push(new FunctionBlock(500, 200, 20, 50, "contador(i)", true, () => print('hey')));
        this.blocks.push(new CondicionalBlock(500, 400, 20, 70, "if", true, () => "if"));
        this.blocks.push(new ReturnBlock(500, 400, 20, 70, "return", true, () => "return"));
        this.blocks.push(new ReturnBlock(500, 400, 20, 70, "return", true, () => "return"));
        this.blocks.push(new BaseBlock(900, 400, 20, 50, "i <= 1", true, (i) => i <= 1));
        this.blocks.push(new BaseBlock(1200, 400, 20, 50, "contador(i - 1) + contador(i - 2)", true, (i, x, y) => this.fibonacci(i, x, y)));

        let button = createButton('click me');
        button.position(0, 100);

        this.blocks[0].drop(this.blocks[1]);
        this.blocks[1].drop(this.blocks[4])
        this.blocks[1].drop(this.blocks[2])
        this.blocks[0].drop(this.blocks[3])
        this.blocks[3].drop(this.blocks[5])

        button.mousePressed(async () => {
            this.nodes = []; nodeX = 1200; nodeY = 400;

            let x = await this.repaint(8, window.innerWidth / 2, window.innerHeight / 2)

            print(x);
        });
    }

    async fibonacci(i, x, y) {
        let value = await this.recursionPart(i - 1, x - 20, y - 30) + await this.recursionPart(i - 2, x + 20, y - 30)

        this.nodes.push({
            num: value,
            x: x,
            y: y
        })

        await sleep(100)

        return value
    }

    recursionPart(i, x, y) {
        let value = this.repaint(i, x, y);
        return value
    }

    repaint(i, x, y) {
        let mainBlock = this.blocks.find(b => b.label == "contador(i)")
        for (let b of mainBlock.children) {
            let result = b.action(i, x, y);
            if (result != undefined && result.type == "end") {
                return result.value
            }
        }
        return undefined;
    }

}