class MovableObject {
    x = 120;
    y = 400;
    img;
    imageCache = {};
    currentImage = 0;
    speed_x = 0.15;
    speed_y = 0.15;
    acceleration = 0.1;
    otherDirection = false;
    energy = 100;
    damage = 0;
    lastHitfromSuperDangerous = false;

    applyWaterResistanceX() {
        this.speed_x += this.acceleration
    };

    applyWaterResistanceY() {
        this.speed_y += this.acceleration
    };

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawOuterFrame(ctx) {
        if (this.checkObjectMovable()) {
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawInnerFrame(ctx) {
        if (this.checkObjectMovable()) {
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
            ctx.stroke();
        }
    }

    checkObjectMovable() {
        return this instanceof Character || this instanceof PufferFish || this instanceof Endboss || this instanceof JellyFish;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed_x;
    }

    moveLeft() {
        this.x -= this.speed_x;
    }

    moveUp() {
        this.y -= this.speed_y;
    }

    moveDown() {
        this.y += this.speed_y;
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right >= mo.x + mo.offset.left &&
            this.x + this.offset.left <= mo.x + mo.width - mo.offset.right &&
            this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
            this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom;
        // obj.onCollisionCourse;
    }

    isAttacking(mo) {
        return this.x + this.width >= mo.x + mo.offset.left &&
            this.x + this.offset.left <= mo.x + mo.width - mo.offset.right &&
            this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
            this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom;
        // obj.onCollisionCourse;
    }

    characterGetHit(enemy) {
        this.energy -= enemy.damage;
        if (this.energy < 0) {
            this.energy = 0;
        }
        if (enemy instanceof JellyFish && enemy.superDangerous) {
            this.lastHitfromSuperDangerous = true;
        } else {
            this.lastHitfromSuperDangerous = false;
        }
    }

    isDead() {
        return this.energy == 0;
    }

    enemyGetHit(enemy) {
        enemy.energy -= this.characterDamage(enemy);
        if (enemy instanceof Endboss || enemy instanceof JellyFish) {
            this.energy -= enemy.damage;
        }
        if (enemy instanceof JellyFish) {
            enemy.superDangerous = true;
            enemy.animate(enemy);
            enemy.damage = 10;
        }
    }
}