let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 83) {
        keyboard.S = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 38) {
        keyboard.UP = false;
        world.character.speed_y = 0;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
        world.character.speed_y = 0;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
        world.character.speed_x = 0;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
        world.character.speed_x = 0;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 83) {
        keyboard.S = false;
        world.lastThrowTime = 0;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
        world.lastThrowTime = 0;
    }
});

window.addEventListener("click", (e) => {
    keyboard.LEFT_CLICK = true;
    keyboard.MOUSE_POSITION.splice(0, 2);
    keyboard.MOUSE_POSITION.push(e.x - e.target.offsetLeft);
    keyboard.MOUSE_POSITION.push(e.y - e.target.offsetTop);
    setTimeout(() => {
        keyboard.LEFT_CLICK = false;
    }, 500);
}, false);