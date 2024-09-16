class Fibonacci extends Blocks {
    setup() {
        this.blocks.push(new FunctionBlock(500, 200, 20, 50, "contador(i)", true, () => print('hey')));
        this.blocks.push(new CondicionalBlock(500, 400, 20, 70, "if", true, () => "if"));
        this.blocks.push(new ReturnBlock(500, 400, 20, 70, "return", true, () => "return"));
        this.blocks.push(new ReturnBlock(500, 400, 20, 70, "return", true, () => "return"));
        this.blocks.push(new BaseBlock(900, 400, 20, 50, "i <= 1", true, (i) => i.n <= 1));
        this.blocks.push(new BaseBlock(1200, 400, 20, 50, "contador(i - 1) + contador(i - 2)", true, (params) => this.fibonacci(params)));
        this.blocks.push(new BaseBlock(900, 400, 20, 50, "i", true, (i) => i.n));

        let button = createButton('click me');
        button.position(0, 100);

        this.blocks[0].drop(this.blocks[1]);
        this.blocks[1].drop(this.blocks[4])
        this.blocks[1].drop(this.blocks[2])
        this.blocks[0].drop(this.blocks[3])
        this.blocks[3].drop(this.blocks[5])

        button.mousePressed(async () => {
            this.nodes = []; nodeX = 1200; nodeY = 400;

            let x = await this.repaint({ n: 8, x: window.innerWidth / 2, y: window.innerHeight / 2 })

            print(x);
        });
    }

    async fibonacci(T) {
        let value = await this.recursionPart({ n: T.n - 1, x: T.x - 20, y: T.y - 30 }) + await this.recursionPart({ n: T.n - 2, x: T.x + 20, y: T.y - 30 })

        this.nodes.push({
            num: value,
            x: T.x,
            y: T.y
        })

        await sleep(100)

        return value
    }

    recursionPart(params) {
        let value = this.repaint(params);
        return value
    }

    repaint(params) {
        let mainBlock = this.blocks.find(b => b.label == "contador(i)")
        for (let b of mainBlock.children) {
            let result = b.action(params);
            if (result != undefined && result.type == "end") {
                return result.value
            }
        }
        return undefined;
    }

}