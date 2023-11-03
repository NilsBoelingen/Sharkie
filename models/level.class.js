class Level {
    enemies;
    backgroundObjects;
    coins;
    poisons;
    level_end_left = -200;
    level_end_right = 5000;
    level_end_up = -140;
    level_end_down = 160;

    constructor(enemies, backgroundObjects, coins, poisons) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.poisons = poisons;
    }
}