class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    bottle = new ThrowableObject();
    statusbar = new StatusBar();
    coinbar = new Coinbar();
    bottlebar = new Bottlebar();
    endbossbar = new Endbossbar();
    endbossbarLogo = new EndbossbarLogo();
    levelEndRock = new Rock();
    throwableObject = [];
    coins = 0;
    characterReachedBoss = false;
    throw_sound = new Audio('audio/throwBottle.mp3');
    collectCoin_sound = new Audio('audio/coin.mp3');
    chickenPaused;
    previousTime;
    currentTime;
    elapsedTimeInSeconds;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.previousTime = Date.now();
    }


    /**
     * This function is used to set the world class to the character class. now the character class can use characteristics from world

     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * This function is for functions which have to run permanently
     */
    run() {

        setInterval(() => {
            this.checkThrowObjects();
            this.checkBottleHitEndboss();
            this.checkBottleCollision();
        }, 200);

        setInterval(() => {
            this.checkEndbossCollision();
            this.checkCharacterReachedBoss();
        }, 50);

        setInterval(() => {
            this.checkEnemyCollision();
            this.checkCoinCollision();
            this.checkBottleHitEnemy();
            this.checkCharacterPosition();
        }, 20);

    }


    /**
     * This function checks the position between the character and the Endboss
     */
    checkCharacterPosition() {
        let endboss = this.level.getEndboss()
        if (this.characterIsBehindEndboss(endboss))
            endboss.CharacterIsBehind = true
        else
            endboss.CharacterIsBehind = false;
        if (this.characterIsCloseToEndboss(endboss))
            endboss.CharacterIsClose = true;
        else
            endboss.CharacterIsClose = false;
    }


    /**
     * 
     * @param {class} endboss 
     * @returns the requirement, that the character is behind the endboss
     */
    characterIsBehindEndboss(endboss) {
        return this.character.x > endboss.x
    }


    /**
     * 
     * @param {class} endboss 
     * @returns the requirement, that the character is close to the endboss
     */
    characterIsCloseToEndboss(endboss) {
        return Math.abs(this.character.x - endboss.x) < 100
    }


    /**
     * This function sets the character reached boss variable in the endboss class to true.With that the endboss starts running
     */
    checkCharacterReachedBoss() {
        if (this.characterHasReachedBoss()) {
            this.characterReachedBoss = true;
            this.level.getEndboss().CharacterReachedBoss();
        }
    }


    /**
     * 
     * @returns the requirement, that the character reached the endboss. This is needed for the endboss to start running
     */
    characterHasReachedBoss() {
        return this.character.x > 4999
    }


    /**
     * This function is for the character, that he can throw a bottle
     */
    checkThrowObjects() {
        if (this.isBottleThrowable()) {
            if (!isMuted)
                this.throw_sound.play()
            if (this.characterLooksRight())
                this.createBottle();
            else if (this.characterLooksLeft()) {
                this.createBottle();
            }
            this.reduceBottleFromInventar();
            this.previousTime = Date.now(); //This is useful to check the time for throwing bottles
        }
    }


    /**
     * 
     * @returns the requirement to throw a bottle
     */
    isBottleThrowable() {
        this.setThrowedTime();
        return this.keyboard.D && this.bottlebar.percentage > 0 && this.elapsedTimeInSeconds > 0.5
    }


    /**
     * This function checked the time. This allows you to set the time that should pass until you can throw a bottle
     */
    setThrowedTime() {
        this.currentTime = Date.now();
        this.elapsedTimeInSeconds = (this.currentTime - this.previousTime) / 1000;
    }


    /**
     * 
     * @returns the direction from the character (right)
     */
    characterLooksRight() {
        return !this.character.otherDirection
    }


    /**
     * 
     * @returns the direction from the character (left)
     */
    characterLooksLeft() {
        return this.character.otherDirection
    }


    /**
     * This function create a throwable bottle. The constructor is used for the coordinates and the 'this.character.otherDirection' for the direction in the throwable class
     */
    createBottle() {
        let bottle = new ThrowableObject(this.character.x + 10, this.character.y + 100, this.character.otherDirection)
        this.throwableObject.push(bottle)
    }


    /**
     * This function reduce the bottle from inventar and the bottlebar
     */
    reduceBottleFromInventar() {
        this.bottlebar.percentage -= 1;
        this.bottlebar.setPercentageBottle(this.bottlebar.percentage);
    }


    /**
     * This function checks if the character is colliging with an enemy and controls the following events
     */
    checkEnemyCollision() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.characterIsCollidingWithEnemy(enemy)) {
                if (this.characterIsAboveGround()) {
                    this.killChicken(enemy, index);
                    this.character.jump();
                } else if (enemy.speed > 0 && !gamePaused) {
                    this.character.hit();
                    this.statusbar.setPercentage(this.character.energy)
                }
            }
        });
    }


    /**
     * 
     * @param {class} enemy 
     * @returns the requirement for an collision with an enemy
     */
    characterIsCollidingWithEnemy(enemy) {
        return this.character.isColliding(enemy)
    }


    /**
     * 
     * @returns the requirement for jumping on the enemy without get damage from the top. If the character is hurt at the moment, he cant kill an enemy 
     */
    characterIsAboveGround() {
        return this.character.isAboveGround() && !this.character.isHurt()
    }


    /**
     * This function checks, if the character is colliding with the endboss
     */
    checkEndbossCollision() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss) && !gamePaused) {
                this.character.hitFromEndboss();
                this.statusbar.setPercentage(this.character.energy)
            }
        });
    }


    /**
     * This function checks, if the character is colliding with an coin
     */
    checkCoinCollision() {
        this.level.coins.forEach((coin) => {
            this.level.coins.forEach((coin, index) => {
                if (this.character.isColliding(coin))
                    this.getCoin(index);
            });
        });
    }


    /**
     * This function delete the coin from the map and add themn to the inventar (Coinbar)
     */
    getCoin(index) {
        this.coins += 1;
        this.level.coins.splice(index, 1);
        this.coinbar.setPercentageCoin(this.coins);
        if (!isMuted) {
            this.collectCoin_sound.play();
        }
    }


    /**
     * This function checks, if the character is colliding with an collactable bottle to add them to the inventar
     */
    checkBottleCollision() {
        this.level.bottles.forEach((b) => {
            this.level.bottles.forEach((bottle, index) => {
                if (this.characterIsCollidingBottle(bottle)) {
                    this.addBottleToInventar(index);
                }
            });
        });
    }


    /**
     * 
     * @returns the requirement to collect a bottle
     */
    characterIsCollidingBottle(bottle) {
        return this.character.isColliding(bottle)
    }


    /**
     * This function add the bottle to the inventar and delet them from the map
     */
    addBottleToInventar(index) {
        this.bottlebar.percentage += 1;
        this.level.bottles.splice(index, 1);
        this.bottlebar.setPercentageBottle(this.bottlebar.percentage);
    }


    /**
     * This function checks, if the throwable bottle hit an enemy
     */
    checkBottleHitEnemy() {
        this.throwableObject.forEach((bottle, tindex) => {
            this.level.enemies.forEach((enemy, index) => {
                if (this.bottleHitEnemy(bottle, enemy)) {
                    this.hitEnemy(bottle, enemy, index)
                }
            })
        })
    };


    /**
     * 
     * @returns the requirement to hit an enemy with an throwable bottle
     */
    bottleHitEnemy(bottle, enemy) {
        return !bottle.bottleHit && bottle.isColliding(enemy)
    }


    /**
     * 
     * This function is for the action responsible, if an bottle hit an enemy
     */
    hitEnemy(bottle, enemy, index) {
        bottle.bottleHit = true;
        this.killChicken(enemy, index);
    }


   /**
     * This function checks, if the throwable bottle hit the endboss
     */
    checkBottleHitEndboss() {
        this.throwableObject.forEach((bottle, index) => {
            this.level.endboss.forEach((endboss) => {
                if (this.bottleHitEndboss(endboss, bottle)) {
                    this.hitEndboss(endboss, bottle);
                }
            })
        })
    }


    /**
     * 
     * @returns the requirement to hit the endboss with an bottle
     */
    bottleHitEndboss(endboss, bottle) {
        return !bottle.bottleHit && bottle.isColliding(endboss)
    }


    /**
     * This function controls what happen, if an bottle hit the endboss
     */
    hitEndboss(endboss, bottle) {
        bottle.bottleHit = true;
        endboss.hitEnemy();
        this.endbossbar.setPercentage(endboss.energy)
    }


    /**
     * 
     * This function let the chicken die
     */
    killChicken(enemy, index) {
        enemy.speed = 0;
        enemy.hitEnemy();
    }


    /**
     * Renders the game elements on the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0); //back

        //----------------------------- Space for Fixed Objects--------------
        this.addToMap(this.statusbar);
        this.addToMap(this.coinbar);
        this.addToMap(this.bottlebar);
        if (this.characterReachedBoss) {
            this.addToMap(this.endbossbar)
            this.addToMap(this.endbossbarLogo)
        }
        this.ctx.translate(this.camera_x, 0);


        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObject);
        this.addToMap(this.levelEndRock)
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw()

        });
    }


    /**
     * Adds an array of game objects to the map
     *
     * @param {Array} objects - An array of game objects to be added to the map
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        });
    }


    /**
     * Adds a single game object to the map and handles the drawing process
     * 
     * @param {Object} mo The game object to be added to the map
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }



    /**
     * Flips the image horizontally for a given game object
     * 
     * @param {Object} mo - The game object whose image is to be flipped
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1)
        mo.x = mo.x * -1;
    }


    /**
     * Restores the context after a horizontal image flip
     * 
     * @param {Object} mo - The game object for which the image was flipped
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}