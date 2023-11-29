class SmallChicken extends MovableObject {
    y = 370;
    height = 50;
    width = 40;
    energy = 5;
    dead_chick_sound = new Audio('audio/small-dead-chicken.mp3');
    deadChickSoundPlayed;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ]


    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x = 600 + Math.random() * 4900;
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }


    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 10,
    }


    animate() {
        setInterval(() => this.moveLeft(), 1000 / 60);

        setInterval(() => this.smallChickenAnimations(), 100);
    }


    moveLeft() {
        if (!gamePaused) {
            super.moveLeft();
        }
    }

/**
 * This function is for the animations to control which animation is needed
 */
    smallChickenAnimations() {
        if (this.isDead()) {
            this.loadImage(this.IMAGES_DEAD)
            this.controlDeadChickenSound();
            this.smallChickenFallDown();
        } else {
            this.playAnimation(this.IMAGES_WALKING)
        }
    }

/**
 *  This function causes the chicken to fall downwards after death
 */
    smallChickenFallDown() {
        setTimeout(() => {
            this.y += 10
        }, 1000);
    }


    /**
     * This function checks whether the sound should be played
     */
    controlDeadChickenSound(){
        if (!this.deadChickSoundPlayed) {
            this.playSound();
            this.deadChickSoundPlayed = true;
        }
    }


    /**
     * This function is for setting the sound
     */
    playSound() {
        if (!isMuted) {
            this.dead_chick_sound.currentTime = 2.9;
            this.dead_chick_sound.play();
        }
    }
}

