class Endboss extends MovableObject {
    drawableObject = new DrawableObject();
    height = 400;
    width = 300;
    y = 50;
    energy = 140;
    reachedBoss = false;
    intervalIds = [];




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


    constructor() {
        super()
        this.loadImage(this.IMAGES_STAY[0]);
        this.loadImages(this.IMAGES_STAY);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 5300
        //this.walkLeftIfChracterIsClose();
        this.animate();

    }

    offset = {
        top: 30,
        left: 20,
        right: 0, 
        bottom: 20
    }



    walkLeftIfChracterIsClose() {
        setInterval(() => {
            if (this.reachedBoss) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.reachedBoss) {
                this.playAnimation(this.IMAGES_WALKING)
            }
        }, 350);

        setInterval(() => {
            if (!this.reachedBoss) {
                this.playAnimation(this.IMAGES_STAY)
            }
        }, 500);


    }


    CharacterReachedBoss() {
        this.reachedBoss = true;
        console.log(this.reachedBoss)
    }

    animate() {
        setInterval(() => {
            this.animations()
        }, 500);


    }

    animations() {
        if (this.isDead()) {
            this.speed = 0;
            this.playAnimation(this.IMAGES_DEAD)
            this.y += 100;
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT)
        } else if (this.reachedBoss) {
            this.speed = 20;
            this.playAnimation(this.IMAGES_WALKING)
            this.moveLeft();
        }



    }
}