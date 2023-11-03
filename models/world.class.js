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
    camera_x = 0;
    lastThrowTime = 0;
    gameStarted = false;

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
        setInterval(() => {
            this.checkCollisions();
            this.checkMouse();
        }, 200);
    }

    checkMouse() {
        if (this.checkMouseClickCollision()) {
            this.gameStarted = true;
        }
    }

    checkMouseClickCollision() {
        return this.keyboard.MOUSE_POSITION[0] > this.startButton.x &&
        this.keyboard.MOUSE_POSITION[0] < this.startButton.x + this.startButton.width &&
        this.keyboard.MOUSE_POSITION[1] > this.startButton.y &&
        this.keyboard.MOUSE_POSITION[1] < this.startButton.y + this.startButton.height;
    }

    checkCollisions() {
        this.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.keyboard.SPACE) {
                this.character.characterGetHit(enemy);
            } else if (this.character.isAttacking(enemy) && this.keyboard.SPACE) {
                this.character.enemyGetHit(enemy);
            }
        });
        this.enemies.forEach((enemy) => {
            this.bubbles.forEach((bubble) => {
                if (enemy.isColliding(bubble) && enemy instanceof JellyFish) {
                    enemy.energy = 0;
                    enemy.animate();
                    this.bubbles.splice(bubble, 1);
                }
            })
        })
        this.enemies.forEach((enemy) => {
            this.poisonBubbles.forEach((poisonBubble) => {
                if (enemy.isColliding(poisonBubble) && enemy instanceof Endboss) {
                    if (enemy.energy <= 0) {
                        enemy.energy = 0;
                    } else {
                        enemy.lastHit = new Date().getTime();
                        enemy.energy -= poisonBubble.damage;
                        this.poisonBubbles.splice(poisonBubble, 1);
                    };
                }
            })
        })
        this.enemies.forEach((enemy) => {
            if (enemy.isDead()) {
                enemy.changeOffset(enemy);
            }
        })
        // nachfragen. Wenn ein coin eingesammelt wird, wird ein beliebiger anderer aus dem Array entfernt und nicht der eingesammelte.
        this.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.character.collectedCoins += 1;
                this.coins.splice(coin, 1);
            }
        })
        // nachfragen. gleiches wie bei den coins.
        this.poisons.forEach((poison) => {
            if (this.character.isColliding(poison)) {
                this.character.collectedPoison += 1;
                this.poisons.splice(poison, 1);
            }
        })
    }

    setWorld() {
        this.character.world = this;
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

        if (!this.gameStarted) {
            this.addToMap(this.startScreen);
            this.addTextToMap('SHARKIE', 400, 320)
            this.addTextToMap('THE GAME', 385, 370)
            this.addToMap(this.startButton);
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
            this.addTextToMap(this.character.energy, 80, 60)
            this.addToMap(this.coinBar);
            this.addTextToMap(this.character.collectedCoins, 220, 60)
            this.addToMap(this.poisonBar);
            this.addTextToMap(this.character.collectedPoison, 310, 60)
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