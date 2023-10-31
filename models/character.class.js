class Character extends MovableObject {
    x = 0;
    y = 50;
    width = 300;
    height = 300;
    world;
    speed_x = 0;
    speed_y = 0;
    speed_x_max = 10;
    speed_y_max = 4;
    offset = {
        top: 140,
        bottom: 220,
        left: 60,
        right: 120,
    };

    IMAGES_SWIM = [
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png',
    ];

    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIM);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_right) {
                if (this.speed_x < this.speed_x_max) {
                    this.applyWaterResistanceX();
                    this.moveRight();
                } else {
                    this.moveRight();
                }
                this.otherDirection = false;
            };
            if (this.world.keyboard.LEFT && this.x > this.world.level.level_end_left) {
                if (this.speed_x < this.speed_x_max) {
                    this.applyWaterResistanceX();
                    this.moveLeft();
                } else {
                    this.moveLeft();
                }
                this.otherDirection = true;
            };
            if (this.world.keyboard.UP && this.y > this.world.level.level_end_up) {
                if (this.speed_y < this.speed_y_max) {
                    this.applyWaterResistanceY();
                    this.moveUp();
                } else {
                    this.moveUp();
                }
            };
            if (this.world.keyboard.DOWN && this.y < this.world.level.level_end_down) {
                if (this.speed_y < this.speed_y_max) {
                    this.applyWaterResistanceY();
                    this.moveDown();
                } else {
                    this.moveDown();
                }
            };
            this.world.camera_x = -this.x + 50;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                this.playAnimation(this.IMAGES_SWIM);
            };
        }, 200);
    }
}