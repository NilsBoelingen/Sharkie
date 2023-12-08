class Keyboard {
    UP = false;
    DOWN = false;
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    S = false;
    D = false;
    LEFT_CLICK = false;
    MOUSE_POSITION = [];

    constructor() {
        this.bindTouchBtns()
    }

    bindTouchBtns() {
        let muteButton = document.getElementById('muteButton');
        muteButton.addEventListener('touchstart', (e) => {
            preventDefault();
            muteGameMusik();
        })

        document.getElementById('upBtn').addEventListener('touchstart', (e) => {
            preventDefault();
            this.UP = true;
        })
        document.getElementById('upBtn').addEventListener('touchend', (e) => {
            preventDefault();
            this.UP = false;
        })
    }
}