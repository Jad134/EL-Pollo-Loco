class Character extends MovableObject {
    height = 280;
    y = 155;
    speed = 10;
    throwObjects = new ThrowableObject();
    endboss = new Endboss();
    drawableObjects = new DrawableObject();
    cameraSmoothness = 0.1;
    hurtSoundPlayed;
    walkIntervall;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ]

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ]

    world;
    walking_sound = new Audio('audio/walking.mp3');
    hurt_sound = new Audio('audio/hurt.mp3')


    offset = {
        top: 120,
        left: 30,
        right: 40,
        bottom: 30,
    }

/**
 * jsdoc construvotr
 */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.applyGravity();
        this.animate();
        this.resetSound();
    }

    /**
     * Controls the Sound replay for the sound if the charater gets hurt
     */
    resetSound() {
        setInterval(() => {
            this.hurtSoundPlayed = false;
        }, 2000);
    }


    /**
     * this function runs the animations
     */
    animate() {
        this.walkIntervallFunction()
        setInterval(() => this.characterAnimations(), 150);
    }


/**
 * Control which animation is needed
 */
    characterAnimations() {
        if (this.isDead()) {
            this.playDeadAnimation();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            if (this.hurtSoundControl()) {
                this.playHurtSound();
            }
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
            if (this.isCharacterWalking()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }


/**
 * starts the dead animation and starts the function for the end screen.
 */
    playDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        this.y += 10
        gameIsLostScreen();
    }


    /**
     * This function controled the sound and prevented repeating
     */
    hurtSoundControl() {
        return !this.hurtSoundPlayed && !isMuted
    }


    /**
     * This function plays the sound
     */
    playHurtSound() {
        this.hurt_sound.play();
        this.hurtSoundPlayed = true;
    }


    /**
     * This function sets the walk intervall to 60 fps
     */
    walkIntervallFunction() {
        this.walkIntervall = setInterval(() => this.characterMove(), 1000 / 60);
    }


    /**
     * 
     * @returns the requirement for character control
     */
    isCharacterWalking() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }


    /**
     * This function looks at what movement the character should make
     */
    characterMove() {
        let targetCameraPosition = -this.x + 500;
        this.walking_sound.pause();
        if (this.canMoveRight())
            this.moveRight();
        if (this.canMoveLeft())
            this.moveLeft();
        if (this.canJump())
            this.jump();
        if (this.controlRightCamera())
            this.moveCameraRight();
        if (this.controlLeftCamera())
            this.moveCameraLeft(targetCameraPosition);
    }


    /**
     * 
     * @returns the requirement for character walks right and cant walk out of map
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !gamePaused;
    }


    /**
     * Character moves right and set the other dircetion to false for the character reflection
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        if (!isMuted) {
            this.walking_sound.play();
        }
    }


    /**
     * 
     * @returns the requirement for the characters walk
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0 && !gamePaused;
    }


    /**
     * let the character move left and set otherDirection to true for the character reflection
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        if (!isMuted) {
            this.walking_sound.play();
        }
    }


    /**
     * 
     * @returns the requirement for the jump
     */
    canJump() {
        return this.world.keyboard.UP && !this.isAboveGround() && !gamePaused || this.world.keyboard.SPACE && !this.isAboveGround() && !gamePaused
    }


    /**
     * 
     * @returns the requirement for the camera
     */
    controlRightCamera() {
        return this.world.keyboard.RIGHT && !gamePaused
    }


    /**
     * This function is for the camera move. If the character moves right, the camera slide right
     */
    moveCameraRight() {
        this.world.camera_x += (-this.x + 100 - this.world.camera_x) * this.cameraSmoothness;
    }


    /**
     * This function is for the camera move. If the character moves left, the camera slide left
     */
    controlLeftCamera() {
        return this.world.keyboard.LEFT && !gamePaused
    }


/**
 * This function is for the camera movement while walking
 * 
 * @param {number} targetCameraPosition 
 */
    moveCameraLeft(targetCameraPosition) {
        this.world.camera_x += (targetCameraPosition - this.world.camera_x) * this.cameraSmoothness;
    }
}