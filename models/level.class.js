class Level {
    enemies;
    backgroundObjects;
    coins;
    poisons;
    world;
    level_end_left = -200;
    level_end_right = 5000;
    level_end_up = -140;
    level_end_down = 160;

    /**
     * This is the function, that create the level from level1.js
     * 
     * @param {string} enemies This are the enemies to create
     * @param {string} backgroundObjects This are the background to create
     * @param {string} coins This are the Coins to create
     * @param {string} poisons This are the poison bottles to create
     */
    constructor(enemies, backgroundObjects, coins, poisons) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.poisons = poisons;
    }
}