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
        bottom: 80,
        left: 60,
        right: 60,
    };
    attackStatus = false;

    IMAGES_SWIM = [
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png',
    ];
    IMAGES_ATTACK = [
        'img/1.Sharkie/4.Attack/Fin slap/1.png',
        'img/1.Sharkie/4.Attack/Fin slap/4.png',
        'img/1.Sharkie/4.Attack/Fin slap/5.png',
        'img/1.Sharkie/4.Attack/Fin slap/6.png',
        'img/1.Sharkie/4.Attack/Fin slap/7.png',
        'img/1.Sharkie/4.Attack/Fin slap/8.png',
    ];

    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_ATTACK);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.checkMovingDirection();
            this.world.camera_x = -this.x + 50;
        }, 1000 / 60);

        setInterval(() => {
            if (this.checkKeyDownToMove()) {
                this.playAnimation(this.IMAGES_SWIM);
            };
        }, 200);
        setInterval(() => {
            if (this.world.keyboard.SPACE && !this.attackStatus) {
                this.playAnimation(this.IMAGES_ATTACK);
            } 
        }, 100);
    }

    characterDamage(enemy) {
        if (enemy instanceof PufferFish) {
            return 100;
        } else if (enemy instanceof JellyFish || enemy instanceof Endboss) {
            return 0;
        };
    }

    checkKeyDownToMove() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN;
    }

    checkMovingDirection() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_right) {
            this.checkMoveRight();
        };
        if (this.world.keyboard.LEFT && this.x > this.world.level.level_end_left) {
            this.checkMoveLeft();
        };
        if (this.world.keyboard.UP && this.y > this.world.level.level_end_up) {
            this.checkMoveUp();
        };
        if (this.world.keyboard.DOWN && this.y < this.world.level.level_end_down) {
            this.checkMoveDown();
        };
    }

    checkMoveRight() {
        if (this.speed_x < this.speed_x_max) {
            this.applyWaterResistanceX();
            this.moveRight();
        } else {
            this.moveRight();
        }
        this.otherDirection = false;
    }

    checkMoveLeft() {
        if (this.speed_x < this.speed_x_max) {
            this.applyWaterResistanceX();
            this.moveLeft();
        } else {
            this.moveLeft();
        }
        this.otherDirection = true;
    }

    checkMoveUp() {
        if (this.speed_y < this.speed_y_max) {
            this.applyWaterResistanceY();
            this.moveUp();
        } else {
            this.moveUp();
        }
    }

    checkMoveDown() {
        if (this.speed_y < this.speed_y_max) {
            this.applyWaterResistanceY();
            this.moveDown();
        } else {
            this.moveDown();
        }
    }
}