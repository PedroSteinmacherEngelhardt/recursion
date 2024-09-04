let currentScreen;

async function setScreen(newScreen) {
    await sleep(100)
    currentScreen = newScreen;
    if (newScreen.setup)
        newScreen.setup();
}

class Menu {
    draw() {
        background(200)
        rect(200, 200, 200, 200)
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}