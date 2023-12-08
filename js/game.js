let canvas;
let world;
let keyboard = new Keyboard();
intervallIds = [];

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function muteGameMusik() {
    let muteButton = document.getElementById('muteButton');
    if (!world.muteMusik) {
        world.muteMusik = true;
        muteButton.src = 'img/hud/musik_off.png';
    } else if (world.muteMusik) {
        world.muteMusik = false;
        muteButton.src = 'img/hud/musik_on.png';
    }
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

function touchLeftStart() {
    event.preventDefault();
    keyboard.LEFT = true;
}

function touchLeftEnd() {
    event.preventDefault();
    keyboard.LEFT = false;
    world.character.speed_x = 0;
}

function touchRightStart() {
    event.preventDefault();
    keyboard.RIGHT = true;
}

function touchRightEnd() {
    event.preventDefault();
    keyboard.RIGHT = false;
    world.character.speed_x = 0;
}

function touchUptStart() {
    event.preventDefault();
    keyboard.UP = true;
}

function touchUpEnd() {
    event.preventDefault();
    keyboard.UP = false;
    world.character.speed_y = 0;
}

function touchDownStart() {
    event.preventDefault();
    keyboard.DOWN = true;
}

function touchDownEnd() {
    event.preventDefault();
    keyboard.DOWN = false;
    world.character.speed_y = 0;
}

function touchSpaceStart() {
    event.preventDefault();
    keyboard.SPACE = true;
}

function touchSpaceEnd() {
    event.preventDefault();
    keyboard.SPACE = false;
}

function touchDStart() {
    event.preventDefault();
    keyboard.D = true;
}

function touchDEnd() {
    event.preventDefault();
    keyboard.D = false;
    world.lastThrowTime = 0;
}

function touchSStart() {
    event.preventDefault();
    keyboard.S = true;
}

function touchSEnd() {
    event.preventDefault();
    keyboard.S = false;
    world.lastThrowTime = 0;
}

window.addEventListener("click", (e) => {
    keyboard.LEFT_CLICK = true;
    keyboard.MOUSE_POSITION.splice(0, 2);
    keyboard.MOUSE_POSITION.push(e.x - e.target.offsetLeft);
    keyboard.MOUSE_POSITION.push(e.y - e.target.offsetTop);
    setTimeout(() => {
        keyboard.LEFT_CLICK = false;
    }, 500);
}, false);

window.addEventListener("touchstart", (e) => {
    world.touchX = e.targetTouches[0].clientX - ((window.innerWidth - canvas.width) / 2);
    world.touchY = e.targetTouches[0].clientY - ((window.innerHeight - canvas.height) / 2);
})

window.addEventListener("mousemove", (e) => {
    keyboard.MOUSE_POSITION.splice(0, 2);
    keyboard.MOUSE_POSITION.push(e.clientX - e.target.getBoundingClientRect().left);
    keyboard.MOUSE_POSITION.push(e.clientY - e.target.getBoundingClientRect().top);
});

function setStopableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervallIds.push(id);
}