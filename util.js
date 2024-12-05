let currentScreen;

function setScreen(newScreen, _showDisplayCanvas = true) {
    circles = {}
    showDisplayCanvas = _showDisplayCanvas
    currentScreen = newScreen;
    if (newScreen.setup)
        newScreen.setup();
}

function goToLevel(level) {
    offset = createVector(0, 0)
    circles = {}
    showDisplayCanvas = true
    currentScreen = level;
    menuContainer.style.display = "none";
    dialogBox.style.display = "block";

    if (currentScreen.setup) {
        currentScreen.setup();
    }
}

function goToMenu() {
    menuContainer.style.display = "block";
    dialogBox.style.display = "none";
    currentScreen.blocks = []
    setScreen(new LevelSelector, false)
}

function level() {
    startMenu.style.display = "none";
    levelSelectorMenu.style.display = "block";
}

function menu() {
    startMenu.style.display = "block";
    levelSelectorMenu.style.display = "none";
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateUUID() {
    return crypto.randomUUID();
}

function setDialog(newDialog = []) {
    dialog = newDialog
    dialogIndex = 0
    dialogCount.innerText = dialogIndex + 1 + "/" + dialog.length
    dialogContent.innerHTML = dialog[dialogIndex]
    dialogBox.style.cursor = 'pointer';
}

function passDialog() {
    event.stopPropagation();
    if (dialogIndex + 1 > dialog.length - 1) {
        return
    }
    dialogIndex += 1
    dialogCount.innerText = dialogIndex + 1 + "/" + dialog.length
    dialogContent.innerHTML = dialog[dialogIndex]
}

function goBackDialog() {
    event.stopPropagation();
    if (dialogIndex - 1 < 0) {
        return
    }
    dialogIndex -= 1
    dialogCount.innerText = dialogIndex + 1 + "/" + dialog.length
    dialogContent.innerHTML = dialog[dialogIndex]
}