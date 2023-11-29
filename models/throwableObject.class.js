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
        let moveInterval = setInterval(() => this.throwBottle(moveInterval), 25);
        this.animate()
    }


    /**
     * This function controls the speed and direction of the thrown bottles
     * 
     * @param {intervall} moveInterval 
     */
    throwBottle(moveInterval) {
        if (this.otherDirectionTrue()) {
            this.x -= 10;
            if (this.bottleHitGround()) {
                this.bottleHit = true;
            }
        } else
            if (this.otherDirectionFalse()) {
                this.x += 10;
                if (this.bottleHitGround()) {
                    this.bottleHit = true;
                }
            } else {
                clearInterval(this.applyGravityInterval);
                this.hideBottleFromCanvas()
                clearInterval(moveInterval);
            }
    }


    otherDirectionTrue() {
        return !this.bottleHit && this.direction
    }


    bottleHitGround() {
        return this.y > 350
    }


    otherDirectionFalse() {
        return !this.bottleHit && !this.walkLeft
    }


    /**
     * This function places the bottles outside the viewing area of ​​the canvas
     */
    hideBottleFromCanvas() {
        setTimeout(() => {
            this.x = 0;
            this.y = -340;
        }, 350);
    }


    animate() {
        setInterval(() => {
            if (this.bottleHit) {
                this.smashBottle();
            } else {
                this.playAnimation(this.IMAGES_BOTTLEROTATION);
            }
        }, 80);
    }


    /**
     * This function is for the splash animation and smash sound responsible
     */
    smashBottle() {
        this.playAnimation(this.IMAGES_BOTTLESPLASH)
        if (!isMuted) {
            this.smashBottle_sound.play();
        }
        this.setBottleSpeedZero()
        setTimeout(() => {
            this.bottleHit = false;
        }, 500);
    }


    /**
     * This function prevents the burst bottle from sliding further
     */
    setBottleSpeedZero() {
        this.speedY = 0;
        this.acceleration = 0;
    }

}

