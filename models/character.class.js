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
    collectedCoins = 0;
    collectedPoison = 0;

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

    IMAGES_BLOW_BUBBLE = [
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png',
    ];

    IMAGES_BLOW_POISON = [
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png',
    ];

    IMAGES_DEAD = [
        'img/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/1.Sharkie/6.dead/1.Poisoned/12.png',
    ];

    IMAGES_DEAD_BY_SHOCK = [
        'img/1.Sharkie/6.dead/2.Electro_shock/1.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/2.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/3.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/4.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/5.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/6.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/7.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/8.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/9.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/10.png',
    ];

    IMAGES_HURT_POISON = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/5.png',
    ];

    IMAGES_HURT_SHOCK = [
        'img/1.Sharkie/5.Hurt/2.Electric shock/o1.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/o2.png',
    ];
    count = 0;

    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_DEAD_BY_SHOCK);
        this.loadImages(this.IMAGES_HURT_POISON);
        this.loadImages(this.IMAGES_HURT_SHOCK);
        this.loadImages(this.IMAGES_BLOW_BUBBLE);
        this.loadImages(this.IMAGES_BLOW_POISON);
        this.animate();
    }

    animate(enemy) {
        let i = 0;
        setInterval(() => {
            this.checkMovingDirection();
            this.world.camera_x = -this.x + 50;
        }, 1000 / 60);

        setInterval(() => {
            this.checkHittedBy(i);
        }, 200);
        // nachfragen. Animationen laufen nicht vernünftig
        setInterval(() => {
            if (this.world.keyboard.SPACE && !this.attackStatus) {
                    this.playAnimation(this.IMAGES_ATTACK);
            };
            if (this.world.keyboard.D && !this.world.lastThrowTime) {
                    this.playAnimation(this.IMAGES_BLOW_BUBBLE);
                setTimeout(() => {
                    let bubble = new Bubble(this.x + 200, this.y + 120, this.otherDirection);
                    this.world.bubbles.push(bubble);
                }, 100);
                this.world.lastThrowTime = new Date();
            }
            if (this.world.keyboard.S && !this.world.lastThrowTime && this.collectedPoison) {
                this.playAnimation(this.IMAGES_BLOW_POISON);
                this.collectedPoison--;
                setTimeout(() => {
                    let poisonBubble = new PoisonBubble(this.x + 200, this.y + 120);
                    this.world.poisonBubbles.push(poisonBubble);
                }, 200);
                this.world.lastThrowTime = new Date();
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

    checkHittedBy(i) {
        if (this.isDead() && this.lastHitfromSuperDangerous) {
            this.playAnimation(this.IMAGES_DEAD_BY_SHOCK);
        } else if (this.isDead() && !this.lastHitfromSuperDangerous) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurtPoison()) {
            if (i < 4) {
                this.playAnimation(this.IMAGES_HURT_POISON);
            };
            i++
        } else if (this.isHurtShock()) {
            if (i < 4) {
                this.playAnimation(this.IMAGES_HURT_SHOCK);
            };
            i++
        } else if (this.checkKeyDownToMove()) {
            this.playAnimation(this.IMAGES_SWIM);
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
        this.world.bubbles.otherDirection = false;
    }

    checkMoveLeft() {
        if (this.speed_x < this.speed_x_max) {
            this.applyWaterResistanceX();
            this.moveLeft();
        } else {
            this.moveLeft();
        }
        this.otherDirection = true;
        this.world.bubbles.otherDirection = true;
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