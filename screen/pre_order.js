class PreOrder extends Blocks {
    setup() {
        this.blocks.push(new FunctionBlock(500, 200, 20, 50, "contador(i)", true, () => print('hey')));
        this.blocks.push(new LoopBlock(500, 400, 20, 50, "loop(node in nodes)", true, (i) => print(i), (i) => i.neighbors));
        //this.blocks.push(new CondicionalBlock(500, 400, 20, 70, "if", true, () => "if"));
        //this.blocks.push(new BaseBlock(900, 400, 20, 50, "PRINT", true, (i) => print(i)));
        this.blocks.push(new BaseBlock(1200, 400, 20, 50, "contador(node)", true, (i) => this.recursionPart(circles[i])));


        circles = {}
        Object.entries(graph).forEach(([key, value]) => {
            circles[key] = {
                i: value.i,
                pos: createVector(value.pos.x, value.pos.y),
                velocity: createVector(0, 0),
                neighbors: value.neighbors
            }
        });

        super.setup(true)

        this.actionButton.mousePressed(() => {
            this.recursionPart(circles["0"]);
        });

    }

    draw() {
        super.draw()
    }

    async recursionPart(i) {
        selected = i
        await sleep(500);

        await this.repaint(i);

    }

    async repaint(i) {
        let mainBlock = this.blocks.find(b => b.label == "contador(i)")
        for (let b of mainBlock.children) {
            let result = await b.action(i);
            if (result == "end") return;
        }
    }

}

