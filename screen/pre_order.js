class PreOrder extends Blocks {
    setup() {
        this.blocks.push(new FunctionBlock(500, 200, 20, 50, "contador(i)", true, () => print('hey')));
        this.mainBlock = this.blocks[0]
        this.blocks.push(new LoopBlock(500, 400, 20, 50, "loop(node in nodes)", true, (i) => print(i), (i) => i.neighbors));
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
            this.iterations = 0
            this.recursionPart(circles["0"]);
        });

        setDialog(this.dialog)
    }

    draw() {
        super.draw()
    }

    async recursionPart(i) {
        selected = i
        await sleep(500);

        await this.repaint(i);

    }

    dialog = [
        ` <p>🌳 <strong>Mentor Virtual</strong>: Olá, jogador! Hoje vamos aprender sobre como <strong>navegar em uma árvore</strong>, um tipo especial de estrutura de dados que aparece em muitos problemas de programação. Pronto para a missão? 🚀</p>
    
        <h3>O que é uma árvore?</h3>
        <p>Uma árvore é uma estrutura hierárquica que organiza dados como nós conectados por arestas. Cada nó pode ter "filhos" (outros nós) e um único "pai" (exceto o nó raiz, que é o topo da árvore).</p>
        
        <p><strong>Exemplo:</strong> Pense em uma árvore genealógica, onde cada pessoa é um nó, conectada aos seus descendentes e ascendentes.</p>
        
        <h3>Como navegamos em uma árvore?</h3>
        <p>Para navegar (ou percorrer) uma árvore, usamos algoritmos que seguem padrões específicos. Os principais tipos de travessia são:</p>
        <ul>
            <li><strong>Pré-ordem (Pre-order):</strong> Visitamos o nó atual primeiro, depois seus filhos.</li>
            <li><strong>Em ordem (In-order):</strong> Visitamos o filho esquerdo, depois o nó atual, e então o filho direito. (Usado em árvores binárias.)</li>
            <li><strong>Pós-ordem (Post-order):</strong> Visitamos os filhos primeiro e o nó atual por último.</li>
            <li><strong>Largura (Breadth-First):</strong> Exploramos todos os nós em cada nível antes de passar para o próximo nível.</li>
        </ul>`,
        `<h3>Como funciona no jogo?</h3>
        <p>No nosso jogo, você controlará a navegação por uma árvore! Sua missão é criar uma função que visite cada nó de forma recursiva ou usando loops. Vamos simplificar:</p>
        <ol>
            <li>Comece no nó raiz (o topo da árvore).</li>
            <li>Siga as conexões para visitar cada nó filho.</li>
            <li>Use recursão para explorar todos os nós filhos de forma automática.</li>
            <li>Registre cada nó visitado (ou execute uma ação nele).</li>
        </ol>
        
        <h3>Exemplo de travessia:</h3>
        <p>Imagine que você quer contar todos os nós de uma árvore:</p>
        <ol>
            <li>Comece no nó raiz e marque como "visitado".</li>
            <li>Para cada nó filho, repita o processo.</li>
            <li>Use recursão para explorar todos os níveis.</li>
        </ol>
        
        <p>Isso permite que você explore a árvore inteira sem perder nenhum nó!</p>
        
        <h3>Por que aprender isso?</h3>
        <p>A navegação em árvores é útil para resolver muitos problemas, como:</p>
        <ul>
            <li><strong>Busca:</strong> Encontrar um valor específico.</li>
            <li><strong>Organização:</strong> Como árvores de diretórios no computador.</li>
            <li><strong>Análise de dados:</strong> Estruturas como árvores de decisão.</li>
        </ul>
        
        <h3>Sua Missão:</h3>
        <p>Monte um algoritmo para navegar na árvore do nosso jogo. Escolha o tipo de travessia pré-ordem e explore todos os nós!</p>`
    ]

}

