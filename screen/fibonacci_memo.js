class FibonacciMemo extends Blocks {
    memo = {}
    setup() {
        this.blocks.push(new FunctionBlock(500, 200, 20, 50, "fibonacci(n)", true, () => print('hey')));
        this.mainBlock = this.blocks[0]
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
            this.iterations = 0
            circles = {};
            this.memo = {}

            let x = await this.repaint({ n: 10, x: cnvSize.width / 2, y: cnvSize.height / 2 })

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

    dialog = [
        `<p>🎮 Olá, jogador! Vamos dar um passo além e aprender uma forma mais eficiente de calcular a <strong>sequência de Fibonacci</strong>: com <em>memoização</em>. 🚀✨</p>
    
        <h3>Por que precisamos otimizar?</h3>
        <p>No cálculo tradicional de Fibonacci usando recursão, os mesmos valores são calculados várias vezes. Isso acontece porque cada chamada recursiva refaz o trabalho para calcular os números anteriores. Isso pode deixar o código muito lento para valores grandes de <code>n</code>.</p>
        
        <p><strong>Exemplo de problema:</strong></p>
        <ul>
            <li>Para calcular <code>F(5)</code>, o código calculará <code>F(4)</code> e <code>F(3)</code>.</li>
            <li>Para calcular <code>F(4)</code>, ele refaz o cálculo de <code>F(3)</code> e <code>F(2)</code>.</li>
            <li>Note que <code>F(3)</code> é calculado mais de uma vez!</li>
        </ul>`,
        `<h3>Como a otimização funciona?</h3>
        <p>A solução é usar um <strong>dicionário</strong> (ou tabela) para armazenar os resultados já calculados. Isso se chama <strong>memoização</strong>. Quando um número de Fibonacci é calculado, ele é salvo automaticamente no dicionário. Se precisarmos do mesmo número no futuro, ele será recuperado do dicionário, sem recalcular.</p>
        
        <p><em>Como isso funciona no código:</em></p>
        <ol>
            <li>Antes de calcular um número de Fibonacci, verificamos se ele já está no dicionário.</li>
            <li>Se estiver, usamos o valor salvo. Isso evita o trabalho de recalcular.</li>
            <li>Se não estiver, calculamos o valor e salvamos no dicionário para uso futuro.</li>
        </ol>
        
        <p><strong>Vantagens:</strong></p>
        <ul>
            <li>Reduz o número de cálculos, tornando o código muito mais rápido.</li>
            <li>O tempo de execução agora cresce de forma linear (<code>O(n)</code>), em vez de exponencial (<code>O(2^n)</code>).</li>
        </ul>`,
        `<h3>O que muda no jogo?</h3>
        <p>No nosso jogo, você usará blocos para criar uma função que calcule Fibonacci com memoização. Para simplificar, a parte de <em>salvar no dicionário</em> será feita automaticamente. Sua tarefa será:</p>
        <ul>
            <li>Criar a lógica que verifica se o número já está no dicionário.</li>
            <li>Retornar o valor do dicionário, se existir.</li>
            <li>Calcular o número e continuar normalmente, salvando-o no dicionário automaticamente.</li>
        </ul>
        
        <h3>Exemplo de funcionamento:</h3>
        <p>Imagine que queremos calcular <code>F(5)</code>. O dicionário começa vazio:</p>
        <ul>
            <li><strong>Passo 1:</strong> Procuramos <code>F(5)</code> no dicionário (não existe).</li>
            <li><strong>Passo 2:</strong> Calculamos <code>F(4)</code> e <code>F(3)</code>.</li>
            <li><strong>Passo 3:</strong> Salvamos os valores de <code>F(4)</code> e <code>F(3)</code> no dicionário.</li>
            <li><strong>Passo 4:</strong> Continuamos até que todos os valores necessários sejam calculados e armazenados.</li>
        </ul>
        
        <p>No final, se precisarmos calcular <code>F(4)</code> novamente, ele será retornado instantaneamente do dicionário.</p>
        
        <h3>Sua Missão:</h3>
        <p>Monte o algoritmo otimizando o cálculo de Fibonacci com memoização. Observe a diferença na eficiência do código ao testar com valores maiores de <code>n</code>.</p>`
    ]

}