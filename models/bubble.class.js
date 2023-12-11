class Bubble extends MovableObject {
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
    IMAGE = 'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png';

    /**
     * This function initialise the bubbles
     * 
     * @param {string} x This is the x-coordinate where the bubble draw
     * @param {string} y This is the y-coordinate where the bubble draw
     * @param {string} otherDirection This variable tells whether the character is looking to the left or right
     */
    constructor(x, y, otherDirection) {
        super().loadImage(this.IMAGE);
        this.x = x;
        this.y = y;
        this.blow(otherDirection);
    }

    /**
     * This function blow the bubble on the right position and in the right direction
     * 
     * @param {string} otherDirection This variable tells whether the character is looking to the left or right
     */
    blow(otherDirection) {
        this.setXOtherDirection(otherDirection);
        setInterval(() => {
            if (this.speed_x > 0 && !otherDirection) {
                this.blowBubbleRight();
            } else if (this.speed_x <= 0 && !otherDirection) {
                this.moveUpWhenBubbleSpeedDown();
            } else if (this.speed_x > 0 && otherDirection) {
                this.blowBubbleLeft();
            } else if (this.speed_x <= 0 && otherDirection) {
                this.moveUpWhenBubbleSpeedDown();
            }
        }, 1000 / 60);
    }

    /**
     * This function is used to blow the bubble to the right side
     * 
     */
    blowBubbleRight() {
        this.moveRight();
        this.speed_x -= this.accelerationX;
        setTimeout(() => {
            this.moveUp();
            this.speed_y += this.accelerationY;
        }, 100);
    }

    /**
     * This function is used to blow the bubble to the left side
     * 
     */
    blowBubbleLeft() {
        this.moveLeft();
        this.speed_x -= this.accelerationX;
        setTimeout(() => {
            this.moveUp();
            this.speed_y += this.accelerationY;
        }, 100);
    }

    /**
     * This function let the bubble swim up, when the speed gets down
     * 
     */
    moveUpWhenBubbleSpeedDown() {
        this.moveUp();
        this.speed_y += this.accelerationY;
    }

    /**
     * This function is to set another x-coordinate when the character looks left. 
     * It's important for the bubble to come out of his mouth.
     * 
     * @param {string} otherDirection This variable tells whether the character is looking to the left or right
     */
    setXOtherDirection(otherDirection) {
        if (otherDirection) {
            this.x -= 200;
        }
    }
}