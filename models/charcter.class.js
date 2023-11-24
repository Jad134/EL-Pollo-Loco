class Character extends MovableObject {
    height = 280;
    y = 80;
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


    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
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


    playDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        this.y += 10
        gameIsLostScreen();
    }


    hurtSoundControl() {
        return !this.hurtSoundPlayed && !isMuted
    }


    playHurtSound() {
        this.hurt_sound.play();
        this.hurtSoundPlayed = true;
    }


    walkIntervallFunction() {
        this.walkIntervall = setInterval(() => this.characterMove(), 1000 / 60);
    }


    isCharacterWalking() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }


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


    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !gamePaused;
    }


    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        if (!isMuted) {
            this.walking_sound.play();
        }
    }


    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0 && !gamePaused;
    }


    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        if (!isMuted) {
            this.walking_sound.play();
        }
    }


    canJump() {
        return this.world.keyboard.UP && !this.isAboveGround() && !gamePaused || this.world.keyboard.SPACE && !this.isAboveGround() && !gamePaused
    }


    controlRightCamera() {
        return this.world.keyboard.RIGHT && !gamePaused
    }


    moveCameraRight() {
        this.world.camera_x += (-this.x + 100 - this.world.camera_x) * this.cameraSmoothness;
    }


    controlLeftCamera() {
        return this.world.keyboard.LEFT && !gamePaused
    }


    moveCameraLeft(targetCameraPosition) {
        this.world.camera_x += (targetCameraPosition - this.world.camera_x) * this.cameraSmoothness;
    }







}