class ThrowableObject extends MovableObject {
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

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLEROTATION)
        this.loadImages(this.IMAGES_BOTTLESPLASH)
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 80;
        this.throw();
    }

    smashBottle_sound = new Audio('audio/bottle_smash.mp3')



    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
        this.animate()

    }

    animate() {

        setInterval(() => {
            
            if (this.y > 320) {
                this.smashBottle_sound.play();
                this.playAnimation(this.IMAGES_BOTTLESPLASH)
                this.speedY = 0;
                this.acceleration = 0; 
                setTimeout(() => {
                    this.x = 0;
                    this.y = -340;
                }, 50);   
            } else{
                this.playAnimation(this.IMAGES_BOTTLEROTATION)
            }
        }, 80);
    }

}

