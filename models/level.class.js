class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 5800;


    constructor(enemies, clouds, backgroundObjects, coins, bottles ) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }

    getEndboss(){
        return this.enemies.find(e => e instanceof Endboss);
    }
}