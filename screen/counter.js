class Counter extends Blocks {
    setup() {
        this.blocks.push(new FunctionBlock(500, 200, 20, 50, "contador(i)", true, () => print('hey')));
        this.mainBlock = this.blocks[0]
        this.blocks.push(new CondicionalBlock(500, 400, 20, 70, "if", true, () => "if"));
        this.blocks.push(new BaseBlock(900, 400, 20, 50, "i <= 10", true, (i) => i <= 10));
        this.blocks.push(new BaseBlock(1200, 400, 20, 50, "contador(i + 1)", true, (i) => this.recursionPart(i)));

        super.setup(true)

        this.actionButton.mousePressed(() => {
            this.iterations = 0
            circles = {}; this.repaint(0);
        });

        setDialog(this.dialog)
    }

    draw() {
        super.draw()
    }

    async recursionPart(i) {
        const circleLenght = Object.keys(circles).length
        const Xoffset = cnvSize.width / 2
        circles[i] = {
            pos: createVector(Xoffset + 1 * circleLenght, 170 * circleLenght + 20),
            i: i,
            velocity: createVector(0, 0),
            neighbors: []
        }
        if (circles[i - 1]) {
            circles[i - 1].neighbors.push(i)
        }
        circles[i].parent = i - 1
        await sleep(350);
        this.repaint(i + 1);
    }

    dialog = [
        ` <p>Olá, jogador! Bem-vindo ao fantástico mundo da <strong>recursão</strong>! 🎉</p>
            <p>Hoje vamos aprender sobre funções recursivas e como usá-las para resolver problemas. Antes de começar sua missão, vou explicar o que elas são, como funcionam e por que são tão úteis.</p>
            
            <h3>O que é uma função recursiva?</h3>
            <p>Uma <strong>função recursiva</strong> é uma função que <em>se chama a si mesma</em> enquanto resolve partes menores de um problema maior. Imagine um quebra-cabeça grande que você resolve peça por peça até terminar.</p>
            `,
        `<h3>Para que servem funções recursivas?</h3>
            <p>Funções recursivas são ótimas para resolver problemas que podem ser divididos em partes menores e semelhantes. Alguns exemplos incluem:</p>
            <ul>
              <li><strong>Estruturas repetitivas:</strong> Contar números ou repetir ações.</li>
              <li><strong>Problemas hierárquicos:</strong> Explorar árvores genealógicas ou diretórios no computador.</li>
              <li><strong>Cálculos matemáticos:</strong> Como o fatorial de um número (ex.: <code>5! = 5 × 4 × 3 × 2 × 1</code>).</li>
              <li><strong>Desafios complexos:</strong> Resolver labirintos ou encontrar o menor caminho entre dois pontos.</li>
            </ul>
      `,
        `<h2>Construindo um Contador Recursivo</h2>
    <p>
       Nesta etapa, você aprenderá como criar um algoritmo simples usando recursão: um contador.
    </p>
    <p>
        Para completar esta fase, arraste os blocos disponíveis e organize-os em ordem, um sobre o outro.
    </p>
    <ul>
        <li>Definir uma condição de saída (quando o contador deve parar).</li>
        <li>Fazer com que a função chame a si mesma com um valor atualizado.</li>
    </ul>
    <p>
        O objetivo é criar um contador que conte de um número inicial até 10.
    </p>
    <p>
        Quando terminar, clique em <b>‘Executar função’</b> para ver o resultado na árvore interativa à direita. Experimente ajustar o código e observe como a execução muda!
    </p>
    `,
    ]

}

