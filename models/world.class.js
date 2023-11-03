class World {
    canvas;
    ctx;
    keyboard;
    level = level1;
    character = new Character();
    enemies = level1.enemies;
    backgroundObjects = level1.backgroundObjects;
    statusBar = new StatusBar();
    poisonBar = new PoisonBar();
    coinBar = new CoinBar();
    bubble = [];
    poisonBubble = [];
    camera_x = 0;
    lastThrowTime = 0;

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
        }, 200);
    }

    checkCollisions() {
        this.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.keyboard.SPACE) {
                this.character.characterGetHit(enemy);
            } else if (this.character.isAttacking(enemy) && this.keyboard.SPACE) {
                this.character.enemyGetHit(enemy);
            }
        });
    }

    setWorld() {
        this.character.world = this;
        this.enemies.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.bubble);
        this.addObjectsToMap(this.poisonBubble);
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.statusBar);
        this.addTextToMap(this.character.energy, 80, 60)
        this.addToMap(this.coinBar);
        this.addTextToMap(this.character.collectedCoins, 220, 60)
        this.addToMap(this.poisonBar);
        this.addTextToMap(this.character.collectedPoison, 310, 60)

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

        mo.drawOuterFrame(this.ctx);
        mo.drawInnerFrame(this.ctx);

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