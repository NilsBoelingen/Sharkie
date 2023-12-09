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

    constructor(x, y, otherDirection) {
        super().loadImage(this.IMAGE);
        this.x = x;
        this.y = y;
        this.blow(otherDirection);
    }

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

    blowBubbleRight() {
        this.moveRight();
        this.speed_x -= this.accelerationX;
        setTimeout(() => {
            this.moveUp();
            this.speed_y += this.accelerationY;
        }, 100);
    }

    blowBubbleLeft() {
        this.moveLeft();
        this.speed_x -= this.accelerationX;
        setTimeout(() => {
            this.moveUp();
            this.speed_y += this.accelerationY;
        }, 100);
    }

    moveUpWhenBubbleSpeedDown() {
        this.moveUp();
        this.speed_y += this.accelerationY;
    }

    setXOtherDirection(otherDirection) {
        if (otherDirection) {
            this.x -= 200;
        }
    }
}