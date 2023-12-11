class PoisonBubble extends MovableObject {
    width = 100;
    height = 100;
    accelerationX = 0.2;
    accelerationY = 0.1;
    speed_x = 12;
    speed_y = 0;
    world;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };
    IMAGE = 'img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png';
    damage = 10;

    /**
     * This function load the images, and the position of the poison bubbles
     * 
     * @param {string} x This is the x-coordinate of the bubble
     * @param {string} y This is the y-coordinate of the bubble
     * @param {string} otherDirection This is the direction. true is left, false is right
     */
    constructor(x, y, otherDirection) {
        super().loadImage(this.IMAGE);
        this.x = x;
        this.y = y;
        this.blow(otherDirection);
    }

    /**
     * this function load the right movement for the bubble
     * 
     * @param {string} otherDirection This is the direction. true is left, false is right 
     */
    blow(otherDirection) {
        this.setXOtherDirection(otherDirection);
        setInterval(() => {
            if (this.speed_x > 0 && !otherDirection) {
                this.blowPoisonRight();
            } else if (this.speed_x <= 0 && !otherDirection) {
                this.moveUpWhenPoisonSpeedDown();
            } else if (this.speed_x > 0 && otherDirection) {
                this.blowPoisonLeft();
            } else if (this.speed_x <= 0 && otherDirection) {
                this.moveUpWhenPoisonSpeedDown();
            }
        }, 1000 / 60);
    }

    /**
     * This function let the bubble move right
     * 
     */
    blowPoisonRight() {
        this.moveRight();
        this.speed_x -= this.accelerationX;
        setTimeout(() => {
            this.moveUp();
            this.speed_y += this.accelerationY;
        }, 100);
    }

    /**
     * This function let the bubble move left
     * 
     */
    blowPoisonLeft() {
        this.moveLeft();
        this.speed_x -= this.accelerationX;
        setTimeout(() => {
            this.moveUp();
            this.speed_y += this.accelerationY;
        }, 100);
    }

    /**
     * This function let the bubble move up when it speed down
     * 
     */
    moveUpWhenPoisonSpeedDown() {
        this.moveUp();
        this.speed_y += this.accelerationY;
    }

    /**
     * This function set a new x-coordinate if the charakter looks left.
     * So the bubble can go throw his mouth.
     * 
     */
    setXOtherDirection(otherDirection) {
        if (otherDirection) {
            this.x -= 200;
        }
    }
}