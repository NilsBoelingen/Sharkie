class PoisonBubble extends MovableObject {
    width = 100;
    height = 100;
    accelerationX = 0.2;
    accelerationY = 0.1;
    speed_x = 12;
    speed_y = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };
    IMAGE = 'img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png';

    constructor(x, y) {
        super().loadImage(this.IMAGE);
        this.x = x;
        this.y = y;
        this.blow();
    }

    blow(x, y) {
        setInterval(() => {
            if (this.speed_x > 0) {
                this.moveRight();
                this.speed_x -= this.accelerationX;
                setTimeout(() => {
                    this.moveUp();
                    this.speed_y += this.accelerationY;
                }, 80);
            } else if (this.speed_x <= 0) {
                this.moveUp();
                this.speed_y += this.accelerationY;
            }
        }, 1000 / 60);
    }
}