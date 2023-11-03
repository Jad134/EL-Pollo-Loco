class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusbar = new StatusBar();
    coinbar = new Coinbar();
    bottlebar = new Bottlebar();
    endbossbar = new Endbossbar();
    endbossbarLogo = new EndbossbarLogo();
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
        //this.endboss.world = this;
    }

    run() {

        setInterval(() => {
            this.checkThrowObjects();
        }, 200);

        setInterval(() => {
            this.checkEnemyCollision();
            this.checkCharacterReachedBoss();
        }, 300);

        setInterval(() => {
            this.checkBottleCollision();
            this.checkCoinCollision();
        }, 20);

    }

    

    checkCharacterReachedBoss() {
        if (this.character.x > 4999) {
            this.characterReachedBoss = true;
            this.level.getEndboss().CharacterReachedBoss();
        }
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.bottlebar.percentage > 0) {
            this.throw_sound.play()
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
            this.throwableObject.push(bottle)
            this.bottlebar.percentage -= 1;
            this.bottlebar.setPercentageBottle(this.bottlebar.percentage);
        }
    }

    checkEnemyCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
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
                    // Entfernen Sie den kollidierten Coin aus der Liste
                    this.coins += 1;
                    this.level.coins.splice(index, 1);
                    // Aktualisieren Sie die Münzanzeige in der StatusBar und geben Sie die Anzahl der Coins mit
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

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

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


        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObject);
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