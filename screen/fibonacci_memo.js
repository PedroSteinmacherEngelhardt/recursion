class FibonacciMemo extends Blocks {
    memo = {}
    setup() {
        this.blocks.push(new FunctionBlock(500, 200, 20, 50, "fibonacci(n)", true, () => print('hey')));
        this.blocks.push(new CondicionalBlock(500, 400, 20, 70, "if", true, () => "if"));
        this.blocks.push(new ReturnBlock(500, 400, 20, 70, "return", true, () => "return"));
        this.blocks.push(new ReturnBlock(500, 400, 20, 70, "return", true, () => "return"));
        this.blocks.push(new BaseBlock(900, 400, 20, 50, "n <= 1", true, (n) => n.n <= 1));
        this.blocks.push(new BaseBlock(1200, 400, 20, 50, "fibonacci(n - 1) + fibonacci(n - 2)", true, (params) => this.fibonacci(params)));
        this.blocks.push(new BaseBlock(900, 400, 20, 50, "n", true, (n) => n.n));

        this.blocks.push(new CondicionalBlock(500, 500, 20, 70, "if", true, () => "if"));
        this.blocks.push(new ReturnBlock(500, 500, 20, 70, "return", true, () => "return"));
        this.blocks.push(new BaseBlock(600, 500, 20, 50, "memo[i]", true, (n) => this.memo[n.n]));
        this.blocks.push(new BaseBlock(600, 500, 20, 50, "memo.has(i)", true, (n) => n.n in this.memo));

        this.blocks[0].drop(this.blocks[1])
        this.blocks[1].drop(this.blocks[4])
        this.blocks[1].drop(this.blocks[2])
        this.blocks[2].drop(this.blocks[6])
        this.blocks[0].drop(this.blocks[3])
        this.blocks[3].drop(this.blocks[5])

        super.setup(true)

        this.actionButton.mousePressed(async () => {
            circles = {};
            this.memo = {}

            let x = await this.repaint({ n: 8, x: cnvSize.width / 2, y: cnvSize.height / 2 })

            print(x);
        });
    }

    draw() {
        super.draw()
    }

    async fibonacci(T) {
        const uuid = generateUUID()
        circles[uuid] = {
            i: 0,
            pos: createVector(T.x, T.y),
            velocity: createVector(0, 0),
            x: T.x,
            y: T.y,
            neighbors: [],
            hide: true
        }

        let value = await this.recursionPart({ n: T.n - 1, x: T.x - 70, y: T.y - 100, neighbor: uuid }) + await this.recursionPart({ n: T.n - 2, x: T.x + 70, y: T.y - 100, neighbor: uuid })
        this.memo[T.n] = value

        circles[uuid].hide = false
        circles[uuid].i = value
        if (circles[T.neighbor])
            circles[T.neighbor].neighbors.push(uuid)

        await sleep(100)

        return value
    }

    recursionPart(params) {
        let value = this.repaint(params);
        return value
    }

    repaint(params) {
        let mainBlock = this.blocks.find(b => b.label == "fibonacci(n)")
        for (let b of mainBlock.children) {
            let result = b.action(params);
            if (result != undefined && result.type == "end") {
                return result.value
            }
        }
        return undefined;
    }

}