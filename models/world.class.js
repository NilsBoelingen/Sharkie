class World {
    canvas;
    ctx;
    keyboard;
    level = level1;
    character = new Character();
    enemies = level1.enemies;
    backgroundObjects = level1.backgroundObjects;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.checkCollision();
        this.setWorld();
    }

    checkCollision() {
        setInterval(() => {
            this.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy) && !this.keyboard.SPACE) {
                    this.character.energy -= enemy.damage;
                    console.log(this.character.energy);
                } else if (this.character.isAttacking(enemy) && this.keyboard.SPACE) {
                    enemy.energy -= this.character.characterDamage(enemy);
                    if (enemy instanceof Endboss || enemy instanceof JellyFish) {
                        this.character.energy -= enemy.damage;
                    }
                    if (enemy instanceof JellyFish) {
                        enemy.superDangerous = true;
                        enemy.animate();
                        enemy.damage = 10;
                    }
                    console.log(enemy.energy);
                }
            });
        }, 200);
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
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);

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