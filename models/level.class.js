class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 5800;


    /**
     * The constructor becomes the variables from the level1.js
     * 
     * @param {class} enemies 
     * @param {class} enboss 
     * @param {class} clouds 
     * @param {class} backgroundObjects 
     * @param {class} coins 
     * @param {class} bottles 
     */

    
    constructor(enemies, enboss, clouds, backgroundObjects, coins, bottles ) {
        this.enemies = enemies;
        this.endboss = enboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }


    /**
     * 
     * @returns the endboss class
     */
    getEndboss(){
        return this.endboss.find(e => e instanceof Endboss);
    }


    /**
     * 
     * @returns the Chicken class
     */
    getChicken(){
        return this.enemies.find(e => e instanceof Chicken);
    }
}