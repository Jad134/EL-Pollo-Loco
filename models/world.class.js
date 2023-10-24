class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusbar = new StatusBar();
    coinbar = new Coinbar();
    coins = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    //console.log('Collision with Charakter', this.character.isDead)
                    this.character.hit();
                    this.statusbar.setPercentage(this.character.energy)
                }
            });
        }, 200);

        setInterval(() => {
            this.checkCoinCollision();
        }, 20);
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

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0); //back

        //----------------------------- Space for Fixed Objects--------------
        this.addToMap(this.statusbar);
        this.addToMap(this.coinbar);
        this.ctx.translate(this.camera_x, 0);


        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
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