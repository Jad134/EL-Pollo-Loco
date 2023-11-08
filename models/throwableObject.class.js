class ThrowableObject extends MovableObject {
    bottleHit = false;
    walkLeft = false;
    direction;

    IMAGES_BOTTLEROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    IMAGES_BOTTLESPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    constructor(x, y, direction) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLEROTATION)
        this.loadImages(this.IMAGES_BOTTLESPLASH)
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 80;
        this.throw();
        this.direction = direction
    }

    smashBottle_sound = new Audio('audio/bottle_smash.mp3')


    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 10,
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        let moveInterval = setInterval(() => {

            if (this.direction) {
                this.x -= 10;
            } else
                if (!this.bottleHit && !this.walkLeft) {
                    this.x += 10;

                    if (this.y > 350) {
                        this.bottleHit = true;
                    }
                } else {
                    clearInterval(this.applyGravityInterval);
                    setTimeout(() => { // hide bottle from canvas
                        this.x = 0;
                        this.y = -340;
                    }, 350);
                    clearInterval(moveInterval);
                }
            //console.log(this.walkLeft)

        }, 25);
        this.animate()

    }

    // this.y > 320

    animate() {
        setInterval(() => {
            if (this.bottleHit) {
                this.smashBottle();
            } else {
                this.playAnimation(this.IMAGES_BOTTLEROTATION);
            }
        }, 80);
    }

    smashBottle() {
        this.playAnimation(this.IMAGES_BOTTLESPLASH)
        this.smashBottle_sound.play();
        this.speedY = 0;
        this.acceleration = 0;
        setTimeout(() => {
            this.bottleHit = false;
        }, 500);
    }

}

