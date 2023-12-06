class World {
    canvas;
    ctx;
    keyboard;
    startScreen = new StartScreen();
    startButton = new StartButton();
    level = level1;
    character = new Character();
    enemies = level1.enemies;
    backgroundObjects = level1.backgroundObjects;
    coins = level1.coins;
    poisons = level1.poisons;
    statusBar = new StatusBar();
    poisonBar = new PoisonBar();
    coinBar = new CoinBar();
    bubbles = [];
    poisonBubbles = [];
    endScreenLose = new EndScreenLose();
    endScreenWin = new EndScreenWin();
    retryButton = new RetryButton();
    camera_x = 0;
    lastThrowTime = 0;
    gameStarted = false;
    gameOver = false;
    winGame = false;
    game_musik = new Audio('audio/game_musik.mp3');
    intro_musik = new Audio('audio/intro.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx.font = 'bold 40px Arial';
        this.ctx.fillStyle = 'white';
        this.draw();
        this.run();
        this.setWorld();
    }

    run() {
        setStopableInterval(() => {
            this.checkCollisions();
        }, 200);
        setInterval(() => {
            this.checkMouse();
        }, 10);
    }

    checkMouse() {
        if (this.checkMouseClickCollision(this.startButton) && this.keyboard.LEFT_CLICK && !this.gameOver && !this.winGame) {
            this.gameStarted = true;
        } else if (this.checkMouseClickCollision(this.retryButton) && this.keyboard.LEFT_CLICK && this.gameOver || this.winGame) {
            location.reload();
        }
        if (this.checkMouseClickCollision(this.startButton) && !this.keyboard.LEFT_CLICK && !this.gameStarted || this.checkMouseClickCollision(this.retryButton) && !this.keyboard.LEFT_CLICK && !this.gameStarted) {
            this.canvas.style.cursor = "pointer";
        } else {
            this.canvas.style.cursor = "auto";
        }
    }

    checkMouseClickCollision(target) {
        return this.keyboard.MOUSE_POSITION[0] > target.x &&
            this.keyboard.MOUSE_POSITION[0] < target.x + target.width &&
            this.keyboard.MOUSE_POSITION[1] > target.y &&
            this.keyboard.MOUSE_POSITION[1] < target.y + target.height;
    }

    checkCollisions() {
        let i = 0;
        let j = 0;
        let k = 0;
        let l = 0;
        this.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.keyboard.SPACE) {
                this.character.characterGetHit(enemy);
            } else if (this.character.isAttacking(enemy) && this.keyboard.SPACE) {
                this.character.enemyGetHit(enemy);
            }
        });
        this.enemies.forEach((enemy) => {
            k = 0;
            this.bubbles.forEach((bubble) => {
                if (enemy.isColliding(bubble) && enemy instanceof JellyFish) {
                    enemy.energy = 0;
                    this.bubbles.splice(k, 1);
                    enemy.animate();
                }
                k++;
            })
        })
        this.enemies.forEach((enemy) => {
            l = 0;
            this.poisonBubbles.forEach((poisonBubble) => {
                if (enemy.isColliding(poisonBubble) && enemy instanceof Endboss) {
                    if (enemy.energy <= 0) {
                        enemy.energy = 0;
                    } else {
                        enemy.lastHit = new Date().getTime();
                        enemy.energy -= poisonBubble.damage;
                        this.poisonBubbles.splice(l, 1);
                    };
                }
                l++;
            })
        })
        this.enemies.forEach((enemy) => {
            if (enemy.isDead()) {
                enemy.changeOffset(enemy);
            }
        })
        this.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.character.collectedCoins += 1;
                this.coins.splice(i, 1);
            }
            i++;
        })
        this.poisons.forEach((poison) => {
            if (this.character.isColliding(poison)) {
                this.character.collectedPoison += 1;
                this.poisons.splice(j, 1);
            }
            j++;
        })
    }

    setWorld() {
        this.character.world = this;
        this.level.world = this;
        this.enemies.forEach((enemy) => {
            enemy.world = this;
        })
        this.bubbles.forEach((bubble) => {
            bubble.world = this;
        })
        this.poisonBubbles.forEach((poisonBubble) => {
            poisonBubble.world = this;
        })
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (!this.gameStarted && !this.gameOver && !this.winGame) {
            this.addToMap(this.startScreen);
            this.addTextToMap('SHARKIE', 400, 320)
            this.addTextToMap('THE GAME', 385, 370)
            this.addToMap(this.startButton);
            this.intro_musik.play();
            this.intro_musik.volume = 0.3;
            this.intro_musik.loop = true;
        } else if (this.gameOver) {
            this.addObjectsToMap(this.level.backgroundObjects);
            this.addToMap(this.endScreenLose);
            this.addToMap(this.retryButton);
        } else if (this.winGame) {
            this.addObjectsToMap(this.level.backgroundObjects);
            this.addToMap(this.endScreenWin);
            this.addToMap(this.retryButton);
        } else if (this.gameStarted) {

            this.ctx.translate(this.camera_x, 0);
            this.addObjectsToMap(this.level.backgroundObjects);
            this.addToMap(this.character);
            this.addObjectsToMap(this.bubbles);
            this.addObjectsToMap(this.poisonBubbles);
            this.addObjectsToMap(this.level.coins);
            this.addObjectsToMap(this.level.poisons);
            this.addObjectsToMap(this.level.enemies);
            this.ctx.translate(-this.camera_x, 0);

            this.addToMap(this.statusBar);
            this.addTextToMap(this.character.energy, 80, 60);
            this.addToMap(this.coinBar);
            this.addTextToMap(this.character.collectedCoins, 220, 60);
            this.addToMap(this.poisonBar);
            this.addTextToMap(this.character.collectedPoison, 310, 60);
        }

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        // Only for developing.
        // mo.drawOuterFrame(this.ctx);
        // mo.drawInnerFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    addTextToMap(text, x, y) {
        this.ctx.fillText(text, x, y);
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}

