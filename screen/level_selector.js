class LevelSelector {
    setup() { clear(); angleMode(DEGREES); }

    symmetry = 6;

    angle = 360 / this.symmetry;

    draw() {
        scale(1)
        translate(window.innerWidth / 2 / sf, window.innerHeight / 2 / sf);
        if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {

            let lineStartX = mouseX - width / 2;
            let lineStartY = mouseY - height / 2;
            let lineEndX = pmouseX - width / 2;
            let lineEndY = pmouseY - height / 2;

            for (let i = 0; i < this.symmetry; i++) {
                rotate(this.angle);
                stroke(255);
                strokeWeight(3);
                line(lineStartX, lineStartY, lineEndX, lineEndY);
                push();
                scale(1, -1);
                line(lineStartX, lineStartY, lineEndX, lineEndY);
                pop();
            }
        }
    }
}
