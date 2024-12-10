class Fibonacci extends Blocks {
    setup() {
        this.blocks.push(new FunctionBlock(500, 200, 20, 50, "fibonacci(n)", true, () => print('hey')));
        this.mainBlock = this.blocks[0]
        this.blocks.push(new CondicionalBlock(500, 400, 20, 70, "if", true, () => "if"));
        this.blocks.push(new ReturnBlock(500, 400, 20, 70, "return", true, () => "return"));
        this.blocks.push(new ReturnBlock(500, 400, 20, 70, "return", true, () => "return"));
        this.blocks.push(new BaseBlock(900, 400, 20, 50, "n <= 1", true, (n) => n.n <= 1));
        this.blocks.push(new BaseBlock(1200, 400, 20, 50, "fibonacci(n - 1) + fibonacci(n - 2)", true, (params) => this.fibonacci(params)));
        this.blocks.push(new BaseBlock(900, 400, 20, 50, "n", true, (n) => n.n));

        /* this.blocks[0].drop(this.blocks[1])
        this.blocks[1].drop(this.blocks[4])
        this.blocks[1].drop(this.blocks[2])
        this.blocks[2].drop(this.blocks[6])
        this.blocks[0].drop(this.blocks[3])
        this.blocks[3].drop(this.blocks[5]) */

        super.setup(true)

        this.actionButton.mousePressed(async () => {
            this.iterations = 0
            circles = {};

            let x = await this.repaint({ n: 8, x: cnvSize.width / 2, y: cnvSize.height / 2 })

            print(x);
        });

        setDialog(this.dialog)
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

        let value = await this.recursionPart({ n: T.n - 1, x: T.x - 70, y: T.y - 100, parent: uuid }) + await this.recursionPart({ n: T.n - 2, x: T.x + 70, y: T.y - 100, parent: uuid })

        circles[uuid].hide = false
        circles[uuid].i = value
        if (T.parent) {
            circles[uuid].parent = T.parent
        }
        if (circles[T.parent]) {
            circles[T.parent].neighbors.push(uuid)
        }

        await sleep(100)

        return value
    }

    recursionPart(params) {
        let value = this.repaint(params);
        return value
    }

    dialog = [
        `<h3>O que é a sequência de Fibonacci?</h3>
    <p>A sequência de Fibonacci é uma série de números onde cada número é a soma dos dois anteriores. Ela começa assim:</p>
    <p><strong>0, 1, 1, 2, 3, 5, 8, 13, 21, 34...</strong></p>
    
    <p>Veja como funciona:</p>
    <ul>
        <li>Os dois primeiros números são sempre <strong>0</strong> e <strong>1</strong>.</li>
        <li>A partir do terceiro número, basta somar os dois números anteriores para obter o próximo valor.</li>
    </ul>
    
    <p><em>Exemplo:</em></p>
    <ul>
        <li><code>0 + 1 = 1</code> (terceiro número)</li>
        <li><code>1 + 1 = 2</code> (quarto número)</li>
        <li><code>1 + 2 = 3</code> (quinto número)</li>
        <li><code>2 + 3 = 5</code> (sexto número)</li>
    </ul>`,
        `<h3>Como calcular Fibonacci com recursão?</h3>
    <p>Funções recursivas são perfeitas para resolver Fibonacci, porque a definição da sequência é baseada na repetição de um mesmo cálculo:</p>
    <ol>
        <li><strong>Passo base (condição de saída):</strong>  
            <ul>
                <li>Se o número for 0 ou 1, o resultado é o próprio número.</li>
                <li><code>F(0) = 0</code> e <code>F(1) = 1</code></li>
            </ul>
        </li>
        <li><strong>Passo recursivo:</strong>  
            <ul>
                <li>Para calcular o enésimo número da sequência, somamos os dois números anteriores:</li>
                <li><code>F(n) = F(n-1) + F(n-2)</code></li>
            </ul>
        </li>
    </ol>`,
        ` <h3>Por que Fibonacci é tão especial?</h3>
    <p>A sequência de Fibonacci aparece em vários lugares na natureza e na matemática, como:</p>
    <ul>
        <li><strong>Padrões naturais:</strong> A disposição das pétalas de flores, sementes de girassóis e pinhas.</li>
        <li><strong>Proporção áurea:</strong> A relação entre números consecutivos da sequência se aproxima da proporção áurea (1.618...), famosa em arte e design.</li>
        <li><strong>Divisões de problemas:</strong> Fibonacci é usado em algoritmos e na computação.</li>
    </ul>
    
    <h3>Sua Missão:</h3>
    <p>Nessa fase, você deve usar blocos de código para criar uma função recursiva que calcule o n-ésimo número de Fibonacci. Não se esqueça:</p>
    <ul>
        <li>Defina uma <strong>condição de saída</strong> para os casos <code>F(0)</code> e <code>F(1)</code>.</li>
        <li>Garanta que a função chame a si mesma com os valores <code>n-1</code> e <code>n-2</code> e some os resultados.</li>
    </ul>
    
    <p>Quando estiver pronto, clique em <strong>“Executar Função”</strong> para ver o processo sendo visualizado na árvore de execução. 🚀</p>
`,
    ]

}