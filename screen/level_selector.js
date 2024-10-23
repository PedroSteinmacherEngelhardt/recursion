class LevelSelector {

    setup() {
        background(200)
    }

    draw() {
        fill(0);
        textSize(32);
        textAlign(CENTER, CENTER);
        text("Selecione uma fase", width / 2, 80);

        this.drawButton("Fase 1", width / 2 - 100, 150, () => setScreen(new Counter));

        this.drawButton("Fase 2", width / 2 - 100, 220, () => setScreen(new Fibonacci));

        //this.drawButton("Fase 3", width / 2 - 100, 290, () => currentScreen = 'fase3');
    }

    drawButton(label, x, y, onClick) {
        fill(100);
        if (mouseX > x && mouseX < x + 200 &&
            mouseY > y && mouseY < y + 50) {
            fill(70);
            if (mouseIsPressed) {
                onClick();
            }

        }
        rect(x, y, 200, 50, 10);

        fill(255);
        textAlign(CENTER, CENTER);
        textSize(24);
        text(label, x + 100, y + 25);
    }
}