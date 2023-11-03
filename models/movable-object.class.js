class MovableObject extends DrawableObject {
    speed_x = 0.15;
    speed_y = 0.15;
    acceleration = 0.1;
    energy = 100;
    damage = 0;
    lastHitfromSuperDangerous = false;
    lastHitPoison = 0;
    lastHitShock = 0;

    applyWaterResistanceX() {
        this.speed_x += this.acceleration
    };

    applyWaterResistanceY() {
        this.speed_y += this.acceleration
    };

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
            this.lastHitShock = new Date().getTime();
        } else if (enemy instanceof JellyFish && !enemy.superDangerous){
            this.lastHitfromSuperDangerous = false;
            this.lastHitShock = new Date().getTime();
        } else {
            this.lastHitfromSuperDangerous = false;
            this.lastHitPoison = new Date().getTime();
        }
    }

    isHurtShock() {
        let timepast = new Date().getTime() - this.lastHitShock;
        timepast = timepast / 1000;
        return timepast < 1;
    }

    isHurtPoison() {
        let timepast = new Date().getTime() - this.lastHitPoison;
        timepast = timepast / 1000;
        return timepast < 1;
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
            enemy.animate();
            enemy.damage = 10;
        }
    }

    changeOffset(enemy) {
            enemy.offset.top = enemy.height / 2;
            enemy.offset.bottom = enemy.height / 2;
            enemy.offset.left = enemy.width / 2;
            enemy.offset.right = enemy.width / 2;
    }
}