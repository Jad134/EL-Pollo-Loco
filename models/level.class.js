class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 5800;


    constructor(enemies, enboss, clouds, backgroundObjects, coins, bottles ) {
        this.enemies = enemies;
        this.endboss = enboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }

    getEndboss(){
        return this.endboss.find(e => e instanceof Endboss);
    }
}