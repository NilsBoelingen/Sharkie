class MovableObject extends DrawableObject {
    speed_x = 0.15;
    speed_y = 0.15;
    acceleration = 0.1;
    energy = 100;
    damage = 0;
    lastHitfromSuperDangerous = false;
    lastHitPoison = 0;
    lastHitShock = 0;

    /**
     * This function added the Waterresitance on the x-Axes
     * 
     */
    applyWaterResistanceX() {
        this.speed_x += this.acceleration
    };

    /**
     * This function added the Waterresitance on the y-Axes
     * 
     */
    applyWaterResistanceY() {
        this.speed_y += this.acceleration
    };

    /**
     * This function let movable objects move right
     * 
     */
    moveRight() {
        this.x += this.speed_x;
    }

    /**
     * This function let movable objects move left
     * 
     */
    moveLeft() {
        this.x -= this.speed_x;
    }

    /**
     * This function let movable objects move up
     * 
     */
    moveUp() {
        this.y -= this.speed_y;
    }

    /**
     * This function let movable objects move down
     * 
     */
    moveDown() {
        this.y += this.speed_y;
    }

    /**
     * This function check that the character collision whis something
     * 
     * @param {string} mo Thats the object you want to check
     * @returns true if object colliding whit character
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right >= mo.x + mo.offset.left &&
            this.x + this.offset.left <= mo.x + mo.width - mo.offset.right &&
            this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
            this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * This function check, that the attack hit an enemy
     * 
     * @param {string} mo This is the enemy you want to check
     * @returns true if the attack hit the enemy
     */
    isAttacking(mo) {
        return this.x + this.width >= mo.x + mo.offset.left &&
            this.x + this.offset.left <= mo.x + mo.width - mo.offset.right &&
            this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
            this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * This function trigger some other functions, when character get hitted
     * 
     * @param {string} enemy This is the enemy, that hit the character
     */
    characterGetHit(enemy) {
        this.energy -= enemy.damage;
        if (this.energy < 0) {
            this.energy = 0;
        }
        if (enemy instanceof JellyFish && enemy.superDangerous) {
            this.hitBySuperDangerous();
        } else if (enemy instanceof JellyFish && !enemy.superDangerous){
            this.hitByJellyFish();
        } else {
            this.hitByPufferFish();
        }
    }

    /**
     * This function set a variable, that the hit was from a superdangerous and make a timestamp for the hit
     * 
     */
    hitBySuperDangerous() {
        this.lastHitfromSuperDangerous = true;
        this.lastHitShock = new Date().getTime();
    }

    /**
     * This function set a variable, that the hit was not from a superdangerous and make a timestamp for the hit
     * 
     */
    hitByJellyFish() {
        this.lastHitfromSuperDangerous = false;
        this.lastHitShock = new Date().getTime();
    }

    /**
     * This function set a variable, that the hit was from a pufferfish and make a timestamp for the hit
     * 
     */
    hitByPufferFish() {
        this.lastHitfromSuperDangerous = false;
        this.lastHitPoison = new Date().getTime();
    }

    /**
     * This function check how time past since the last hit
     * 
     * @returns true if the was in the last second
     */
    isHurtShock() {
        let timepast = new Date().getTime() - this.lastHitShock;
        timepast = timepast / 1000;
        return timepast < 1;
    }

    /**
     * This function check how time past since the last hit
     * 
     * @returns true if the was in the last second
     */
    isHurtPoison() {
        let timepast = new Date().getTime() - this.lastHitPoison;
        timepast = timepast / 1000;
        return timepast < 1;
    }

    /**
     * This function check that the character or an enemy is dead
     * 
     * @returns true if the energy of the object is at zero
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * This function set some variables, when an enemy get hit by charakter
     * 
     * @param {string} enemy This is the enemy, that get hitted
     */
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

    /**
     * This function is used to change the offset from enemies, when they are dead.
     * So the character cant get hitted from dead enemy
     * 
     * @param {string} enemy This is the enemy, that is dead
     */
    changeOffset(enemy) {
            enemy.offset.top = enemy.height / 2;
            enemy.offset.bottom = enemy.height / 2;
            enemy.offset.left = enemy.width / 2;
            enemy.offset.right = enemy.width / 2;
    }
}