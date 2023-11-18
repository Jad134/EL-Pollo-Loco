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
    throw_sound = new Audio('audio/throwBottle.mp3')



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();

    }

    setWorld() {
        this.character.world = this;
    }

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


    checkCharacterPosition() {
        let endboss = this.level.getEndboss()
        if (this.character.x > endboss.x) {
            endboss.CharacterIsBehind = true
        } else {
            endboss.CharacterIsBehind = false;
        }

        if (Math.abs(this.character.x - endboss.x) < 200) {
            endboss.CharacterIsClose = true;
        } else {
            endboss.CharacterIsClose = false;
        }
    }

    checkCharacterReachedBoss() {
        if (this.character.x > 4999) {
            this.characterReachedBoss = true;
            this.level.getEndboss().CharacterReachedBoss();
        }
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.bottlebar.percentage > 0) {
            if (!isMuted) {
                this.throw_sound.play()
            }
            if (!this.character.otherDirection) {
                let bottle = new ThrowableObject(this.character.x + 10, this.character.y + 100, this.character.otherDirection)
                this.throwableObject.push(bottle)
            } else if (this.character.otherDirection) {
                let bottle = new ThrowableObject(this.character.x + 10, this.character.y + 100, this.character.otherDirection)
                this.throwableObject.push(bottle)
            }

            this.bottlebar.percentage -= 1;
            this.bottlebar.setPercentageBottle(this.bottlebar.percentage);
        }

    }

    checkEnemyCollision() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround()) {
                    this.killChicken(enemy, index);
                    this.character.jump();
                } else if (enemy.speed > 0) {
                    this.character.hit();
                    this.statusbar.setPercentage(this.character.energy)
                }
            }
        });
    }

    checkEndbossCollision() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                //console.log('Collision with Charakter', this.character.isDead)
                this.character.hit();
                this.statusbar.setPercentage(this.character.energy)
            }
        });
    }

    checkCoinCollision() {
        this.level.coins.forEach((coin) => {
            this.level.coins.forEach((coin, index) => {
                if (this.character.isColliding(coin)) {
                    // Entfernen den kollidierten Coin aus der Liste
                    this.coins += 1;
                    this.level.coins.splice(index, 1);
                    // Aktualisiert die Münzanzeige in der StatusBar und gibt die Anzahl der Coins mit
                    this.coinbar.setPercentageCoin(this.coins);
                }
            });
        });
    }

    checkBottleCollision() {
        this.level.bottles.forEach((b) => {
            this.level.bottles.forEach((bottle, index) => {
                if (this.character.isColliding(bottle)) {
                    this.bottlebar.percentage += 1;
                    this.level.bottles.splice(index, 1);
                    this.bottlebar.setPercentageBottle(this.bottlebar.percentage);
                }

            });
        });
    }

    checkBottleHitEnemy() {
        this.throwableObject.forEach((bottle, tindex) => {
            this.level.enemies.forEach((enemy, index) => {
                if (!bottle.bottleHit && bottle.isColliding(enemy)) {
                    bottle.bottleHit = true;
                    this.killChicken(enemy, index);

                }
            })
        })
    };

    checkBottleHitEndboss() {
        this.throwableObject.forEach((bottle, index) => {
            this.level.endboss.forEach((endboss) => {
                if (!bottle.bottleHit && bottle.isColliding(endboss)) {
                    bottle.bottleHit = true;
                    endboss.hitEnemy();
                    this.endbossbar.setPercentage(endboss.energy)
                    console.log(endboss.energy)
                }
            })
        })
    }

    killChicken(enemy, index) {
        enemy.speed = 0;
        enemy.hitEnemy();
        //setTimeout(() => {
        //   this.level.enemies.splice(index, 1)
        //}, 800);
    }

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
    addObjectsToMap(objects) {

        objects.forEach(o => {
            this.addToMap(o)
        });
    }

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

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1)
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}