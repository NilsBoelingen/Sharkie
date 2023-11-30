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
        if (otherDirection) {
            this.x -= 200;
        }
        setInterval(() => {
            if (this.speed_x > 0 && !otherDirection) {
                this.moveRight();
                this.speed_x -= this.accelerationX;
                setTimeout(() => {
                    this.moveUp();
                    this.speed_y += this.accelerationY;
                }, 100);
            } else if (this.speed_x <= 0 && !otherDirection) {
                this.moveUp();
                this.speed_y += this.accelerationY;
            } else if (this.speed_x > 0 && otherDirection) {
                this.moveLeft();
                this.speed_x -= this.accelerationX;
                setTimeout(() => {
                    this.moveUp();
                    this.speed_y += this.accelerationY;
                }, 100);
            } else if (this.speed_x <= 0 && otherDirection) {
                this.moveUp();
                this.speed_y += this.accelerationY;
            }
        }, 1000 / 60);
    }
}