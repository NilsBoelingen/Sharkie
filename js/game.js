let canvas;
let world;
let keyboard = new Keyboard();
intervallIds = [];
let fullscreen = false;
let startButtonActivated = false;

/**
 * This function is used to get the canvas and create the world in world.class.js
 * 
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * This function is used to get the mute-button and set the variable
 * 
 */
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

/**
 * This function stop all intervalls
 * 
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * This function is used to get the event, when the user push a key down
 * 
 */
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

/**
 * This function is used to get the event, when the user release the key
 * 
 */
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

/**
 * This function ist used, to get the event, when the user change the screen size, to push an alert
 * 
 */
window.addEventListener('resize', (e) => {
    if (window.innerWidth < window.innerHeight && window.innerWidth <= 720) {
        document.getElementById('alertContainer').classList.remove('d-none');
    } else {
        document.getElementById('alertContainer').classList.add('d-none');
    }
})

/**
 * This function listen to the touchevent on left button on mobile devices
 * 
 */
function touchLeftStart() {
    event.preventDefault();
    keyboard.LEFT = true;
}

/**
 * This function listen for release the users finger on touchscreen
 * 
 */
function touchLeftEnd() {
    event.preventDefault();
    keyboard.LEFT = false;
    world.character.speed_x = 0;
}

/**
 * This function listen to the touchevent on right button on mobile devices
 * 
 */
function touchRightStart() {
    event.preventDefault();
    keyboard.RIGHT = true;
}

/**
 * This function listen for release the users finger on touchscreen
 * 
 */
function touchRightEnd() {
    event.preventDefault();
    keyboard.RIGHT = false;
    world.character.speed_x = 0;
}

/**
 * This function listen to the touchevent on up button on mobile devices
 * 
 */
function touchUptStart() {
    event.preventDefault();
    keyboard.UP = true;
}

/**
 * This function listen for release the users finger on touchscreen
 * 
 */
function touchUpEnd() {
    event.preventDefault();
    keyboard.UP = false;
    world.character.speed_y = 0;
}

/**
 * This function listen to the touchevent on down button on mobile devices
 * 
 */
function touchDownStart() {
    event.preventDefault();
    keyboard.DOWN = true;
}

/**
 * This function listen for release the users finger on touchscreen
 * 
 */
function touchDownEnd() {
    event.preventDefault();
    keyboard.DOWN = false;
    world.character.speed_y = 0;
}

/**
 * This function listen to the touchevent on attack button on mobile devices
 * 
 */
function touchSpaceStart() {
    event.preventDefault();
    keyboard.SPACE = true;
}

/**
 * This function listen for release the users finger on touchscreen
 * 
 */
function touchSpaceEnd() {
    event.preventDefault();
    keyboard.SPACE = false;
}

/**
 * This function listen to the touchevent on bubble-attack button on mobile devices
 * 
 */
function touchDStart() {
    event.preventDefault();
    keyboard.D = true;
}

/**
 * This function listen for release the users finger on touchscreen
 * 
 */
function touchDEnd() {
    event.preventDefault();
    keyboard.D = false;
    world.lastThrowTime = 0;
}

/**
 * This function listen to the touchevent on poison-bubble-attack button on mobile devices
 * 
 */
function touchSStart() {
    event.preventDefault();
    keyboard.S = true;
}

/**
 * This function listen for release the users finger on touchscreen
 * 
 */
function touchSEnd() {
    event.preventDefault();
    keyboard.S = false;
    world.lastThrowTime = 0;
}

/**
 * This function is used to push all intervall-Ids in an array
 * 
 * @param {string} fn This is the function name, that is triggert in the intervall 
 * @param {*} time This is the Intervalltime
 */
function setStopableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervallIds.push(id);
}

/**
 * This function is used to set the canvas in fullscreen and back by onclick
 * 
 */
function switchFullscreen() {
    let mainFullscreen = document.getElementById('mainFullscreen');
    if (!fullscreen) {
        fullscreen = true;
        enterFullscreen(mainFullscreen);
    } else if (fullscreen) {
        fullscreen = false;
        exitFullscreen();
    }
}

/**
 * This function requsted the fullscreen
 * 
 * @param {string} element This is the element, that request the fullscreen
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
 * This function exit the fullscreen
 * 
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * This function sets the variable when the user is click on start button
 * 
 */
function activateStartButton() {
    startButtonActivated = true;
}