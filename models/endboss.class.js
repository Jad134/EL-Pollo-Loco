class Endboss extends MovableObject {
    drawableObject = new DrawableObject();
    height = 400;
    width = 300;
    y = 50;
    energy = 140;
    reachedBoss = false;
    CharacterIsBehind = false;
    CharacterIsClose = false;
    intervalIds = [];
    bigChickenSound = new Audio('audio/chicken-beginn.mp3')
    bigChickenSoundPlayed = false;


    IMAGES_STAY = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ]


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ]

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ]

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ]


    constructor() {
        super()
        this.loadImage(this.IMAGES_STAY[0]);
        this.loadImages(this.IMAGES_STAY);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 5300
        this.playEndbossSound()
        this.animate();
    }


    offset = {
        top: 30,
        left: 20,
        right: 0,
        bottom: 20
    }


    /**
     * This function starts the Endboss animations with different conditions
     */
    walkLeftIfChracterIsClose() {
        setInterval(() => this.canEndbossMoveLeft(), 1000 / 60);

        setInterval(() => this.startWalkAnimation(), 350);

        setInterval(() => this.letChickenStay(), 500);
    }


    canEndbossMoveLeft() {
        if (this.reachedBoss && !gamePaused)
            this.moveLeft();
    }


    startWalkAnimation() {
        if (this.reachedBoss && !gamePaused)
            this.playAnimation(this.IMAGES_WALKING)
    }


    letChickenStay() {
        if (!this.reachedBoss)
            this.playAnimation(this.IMAGES_STAY)
    }


    CharacterReachedBoss() {
        this.reachedBoss = true;
    }


    animate() {
        setInterval(() => {
            this.animations()
        }, 500);
    }


    animations() {
        if (this.isDead())
            this.showDeadChicken();
        else if (this.isHurt())
            this.playAnimation(this.IMAGES_HURT);
        else if (this.CharacterIsClose && !gamePaused)
            this.chickenAttacks();
        else if (this.CharacterIsBehind && !gamePaused)
            this.chickenMoveRight();
        else if (this.reachedBoss && !this.CharacterIsBehind && !gamePaused)
            this.chickenMoveLeft();
        else if (!this.reachedBoss)
            this.playAnimation(this.IMAGES_STAY);
    }


    /**
     * The following four functions are responsible for the respective animations
     */
    showDeadChicken() {
        this.speed = 0;
        this.playAnimation(this.IMAGES_DEAD)
        this.y += 100;
        setTimeout(() => {
            gameIsOverScreen();
        }, 300);
    }


    chickenAttacks() {
        this.speed = 50;
        this.playAnimation(this.IMAGES_ATTACK)
        this.moveLeft();
    }


    chickenMoveRight() {
        this.speed = 40;
        this.playAnimation(this.IMAGES_WALKING)
        this.otherDirection = true;
        this.moveRight();
    }

    chickenMoveLeft() {
        this.speed = 40;
        this.playAnimation(this.IMAGES_WALKING)
        this.otherDirection = false;
        this.moveLeft();
    }


    playEndbossSound() {
        setTimeout(() => {
            if (this.allowChickenSound()) {
                this.bigChickenSound.play()
                this.bigChickenSoundPlayed = true;
            }
        }, 100);
        this.replayEndbossSound();
    }


    allowChickenSound() {
        return !this.bigChickenSoundPlayed && !isMuted && !gamePaused && this.reachedBoss
    }


    /**
     * This function controls the time for the sound
     */
    replayEndbossSound() {
        setInterval(() => {
            this.bigChickenSoundPlayed = false;
        }, 10000);

        setTimeout(() => {
            this.playEndbossSound();
        }, 10000);
    }

}