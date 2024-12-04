class Counter extends Blocks {
    setup() {
        this.blocks.push(new FunctionBlock(500, 200, 20, 50, "contador(i)", true, () => print('hey')));
        this.blocks.push(new CondicionalBlock(500, 400, 20, 70, "if", true, () => "if"));
        this.blocks.push(new BaseBlock(900, 400, 20, 50, "i <= 10", true, (i) => i <= 10));
        this.blocks.push(new BaseBlock(1200, 400, 20, 50, "contador(i + 1)", true, (i) => this.recursionPart(i)));

        let button = createButton('click me');
        button.position(0, 100);

        button.mousePressed(() => {
            circles = {}; nodeX = 1200; nodeY = 400; this.repaint(0);
        });
    }

    draw() {
        super.draw()
        drawBackButton()
    }

    async recursionPart(i) {
        const circleLenght = Object.keys(circles).length
        const Xoffset = cnvSize.width / 2
        circles[i] = {
            pos: createVector(Xoffset + 1 * circleLenght, 170 * circleLenght + 20),
            i: i,
            velocity: createVector(0, 0),
            angle: 0,
            neighbors: []
        }
        if (circles[i - 1]) {
            circles[i - 1].neighbors.push(i)
        }
        await sleep(350);
        this.repaint(i + 1);
    }

    repaint(i) {
        let mainBlock = this.blocks.find(b => b.label == "contador(i)")
        for (let b of mainBlock.children) {
            let result = b.action(i);
            if (result == "end") return;
        }
    }

}

