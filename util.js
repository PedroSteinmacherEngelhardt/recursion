let currentScreen;

async function setScreen(newScreen) {
    await sleep(100)
    currentScreen = newScreen;
    if (newScreen.setup)
        newScreen.setup();
}

function drawBackButton() {
    const x = width / 2 - 100
    const y = height - 100

    fill(100);
    if (mouseX > x && mouseX < x + 200 &&
        mouseY > y && mouseY < y + 50) {
        fill(70);
        if (mouseIsPressed) {
            setScreen(new LevelSelector)
        }

    }
    rect(x, y, 200, 50, 10);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("voltar", x + 100, y + 25);
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}