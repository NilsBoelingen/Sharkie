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
    interval;
    hittedBy = false;
    deadBy = false;
    attack_sound = new Audio('audio/attack.mp3');
    bubble_attack_sound1 = new Audio('audio/breathe.mp3');
    bubble_attack_sound2 = new Audio('audio/blow.mp3');
    bubble_attack_sound3 = new Audio('audio/bubble-attack.mp3');

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
        let intervalMove = setInterval(() => {
            this.checkMovingDirection();
            this.world.camera_x = -this.x + 50;
        }, 1000 / 60);

        setInterval(() => {
            this.checkHittedBy(enemy);
        }, 200);
        let intervalAttack = setInterval(() => {
            this.checkAttackType();
        }, 100);
        let interval1 = setInterval(() => {
            if (this.characterDeadByShock()) {
                this.clearSettedIntervalls(interval1, intervalMove, intervalAttack);
                this.deadByShock();
            } else if (this.characterDeadByPoison()) {
                this.clearSettedIntervalls(interval1, intervalMove, intervalAttack);
                this.deadByPoison();
            } else if (this.characterHittedByPoison()) {
                this.hittedByPoison();
            } else if (this.characterHittedByShock()) {
                this.hittedByShock();
            }
        }, 100);
        setInterval(() => {
            if (this.checkKeyDownToMove() && !this.deadBy && !this.hittedBy) {
                this.playAnimation(this.IMAGES_SWIM);
            };
        }, 200);
    }

    characterDeadByShock() {
        return this.deadBy == 'shock' && !this.hittedBy;
    }

    characterDeadByPoison() {
        return this.deadBy == 'poison' && !this.hittedBy;
    }

    characterHittedByShock() {
        return this.hittedBy == 'shock' && !this.deadBy;
    }

    characterHittedByPoison() {
        return this.hittedBy == 'poison' && !this.deadBy;
    }

    clearSettedIntervalls(interval1, intervalMove, intervalAttack) {
        clearInterval(interval1);
        clearInterval(intervalMove);
        clearInterval(intervalAttack);
    }

    hittedByShock() {
        let interval = setInterval(() => {
            this.playAnimation(this.IMAGES_HURT_SHOCK);
        }, 200);
        setTimeout(() => {
            clearInterval(interval);
            this.hittedBy = false;
        }, 800);
    }

    hittedByPoison() {
        let interval = setInterval(() => {
            this.playAnimation(this.IMAGES_HURT_POISON);
        }, 200);
        setTimeout(() => {
            clearInterval(interval);
            this.hittedBy = false;
        }, 800);
    }

    deadByPoison() {
        let interval = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 115);
        setTimeout(() => {
            clearInterval(interval);
        }, 1200);
        setTimeout(() => {
            this.world.gameStarted = false;
            this.world.gameOver = true;
        }, 2000);
    }

    deadByShock() {
        let interval = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD_BY_SHOCK);
        }, 100);
        setTimeout(() => {
            clearInterval(interval);
        }, 1000);
        setTimeout(() => {
            this.world.gameStarted = false;
            this.world.gameOver = true;
        }, 2000);
    }

    checkAttackType() {
        if (this.world.keyboard.SPACE && !this.attackStatus) {
            this.attackTypeNormal();
        };
        if (this.world.keyboard.D && !this.world.lastThrowTime) {
            this.attackTypeBubble();
        }
        if (this.world.keyboard.S && !this.world.lastThrowTime && this.collectedPoison) {
            this.attackTypePoisonBubble();
        }
    }

    attackTypeNormal() {
        this.attackStatus = true;
        this.playAttackAnimation();
    }

    attackTypeBubble() {
        this.attackStatus = true;
        this.playBubbleAttackAnimation();
        this.world.lastThrowTime = new Date();
    }

    attackTypePoisonBubble() {
        this.attackStatus = true;
        this.playPoisonBubbleAttackAnimation();
        this.collectedPoison--;
        this.world.lastThrowTime = new Date();
    }

    playAttackAnimation() {
        if (this.attackStatus) {
            this.interval = setInterval(() => {
                this.playAnimation(this.IMAGES_ATTACK);
                this.playAttackSound();
            }, 100);
        }
        setTimeout(() => {
            this.attackStatus = false;
            clearInterval(this.interval);
        }, 600);
    }

    playAttackSound() {
        this.attack_sound.play();
        setTimeout(() => {
            this.attack_sound.pause();
        }, 390);
    }

    playBubbleAttackAnimation() {
        if (this.attackStatus) {
            this.interval = setInterval(() => {
                this.playAnimation(this.IMAGES_BLOW_BUBBLE);
            }, 100);
            this.playBubbleSound();
            setTimeout(() => {
                this.attackStatus = false;
                clearInterval(this.interval);
            }, 800);
        }
        setTimeout(() => {
            let bubble = new Bubble(this.x + 200, this.y + 120, this.otherDirection);
            this.world.bubbles.push(bubble);
        }, 700);
    }

    playPoisonBubbleAttackAnimation() {
        if (this.attackStatus) {
            this.interval = setInterval(() => {
                this.playAnimation(this.IMAGES_BLOW_POISON);
            }, 100);
            this.playBubbleSound();
            setTimeout(() => {
                this.attackStatus = false;
                clearInterval(this.interval);
            }, 800);
        }
        setTimeout(() => {
            let poisonBubble = new PoisonBubble(this.x + 200, this.y + 120, this.otherDirection);
            this.world.poisonBubbles.push(poisonBubble);
        }, 700);
    }

    playBubbleSound() {
        this.bubble_attack_sound1.play();
        setTimeout(() => {
            this.bubble_attack_sound2.play();
        }, 470);
        setTimeout(() => {
            this.bubble_attack_sound3.play();
        }, 880);
    }

    checkWinGame() {
        setInterval(() => {
            this.world.enemies.forEach((enemy) => {
                if (this instanceof Endboss && this.isDead())
                    setTimeout(() => {
                        this.world.gameStarted = false;
                        this.world.winGame = true;
                    }, 2000);
            })
        }, 100);
    }

    characterDamage(enemy) {
        if (enemy instanceof PufferFish) {
            return 100;
        } else if (enemy instanceof JellyFish || enemy instanceof Endboss) {
            return 0;
        };
    }

    checkHittedBy(enemy) {
        if (this.isDead() && this.lastHitfromSuperDangerous) {
            this.deadBy = 'shock';
        } else if (this.isDead() && !this.lastHitfromSuperDangerous) {
            this.deadBy = 'poison';
        } else if (this.isHurtPoison()) {
            this.hittedBy = 'poison';
        } else if (this.isHurtShock()) {
            this.hittedBy = 'shock';
        }
    }

    checkKeyDownToMove() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN;
    }

    checkMovingDirection() {
        if (this.isMoveRight()) {
            this.checkMoveRight();
        };
        if (this.isMoveLeft()) {
            this.checkMoveLeft();
        };
        if (this.isMoveUp()) {
            this.checkMoveUp();
        };
        if (this.isMoveDown()) {
            this.checkMoveDown();
        };
    }

    isMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_right;
    }

    isMoveLeft() {
        return this.world.keyboard.LEFT && this.x > this.world.level.level_end_left;
    }

    isMoveUp() {
        return this.world.keyboard.UP && this.y > this.world.level.level_end_up;
    }

    isMoveDown() {
        return this.world.keyboard.DOWN && this.y < this.world.level.level_end_down;
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