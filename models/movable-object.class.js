class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    applyGravityInterval = 0;

    
    /**
     * This function is for the gravity e.g. the character jump and the bottle throw
     */
    applyGravity() {
        this.applyGravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                if (!(this instanceof ThrowableObject)) {
                    this.y = Math.min(this.y - this.speedY, 155);
                } else {
                    this.y -= this.speedY; 
                }
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }


    /**
     * 
     * This function check if an object is above the ground(y = 155)
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable objects shut always fall
            return true
        } else {
            return this.y < 155;
        }
    }


    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }


    /**
     * This function checks if an movable object is colliding with an other object
     * 
     * @param {*} mo is meaning movable object
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    /**
     * This function is for when an enemy takes damage
     */
    hitEnemy() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * This function is for when the character takes damage
     */
    hit() {
        this.energy -= 0.5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * This function is for when the character takes damage from the endboss
     */
    hitFromEndboss() {
        this.energy -= 3.5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * 
     * @returns the energy for an movable object with 0
     */
    isDead() {
        return this.energy == 0;
    }


    /**
      * Checks if the entity is currently in a "hurt" state based on the last hit time.
      *
      * @returns {boolean} - Returns true if the entity is currently hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 700;
        return timepassed < 1;
    }


    /**
     * This function is responsible for the animations
     * 
     * @param {Array} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * This function let the characters walk right
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * This function let the characters walk left
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * This function let the characters jump
     */
    jump() {
        this.speedY = 30;
    }
}