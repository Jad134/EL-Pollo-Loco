class Chicken extends MovableObject {
    y = 350;
    height = 80;
    width = 80;
    energy = 5;
    dead_chicken_sound = new Audio('audio/dead-chicken.mp3');
    deadSoundPlayed;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 600 + Math.random() * 3900;
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
        this.resetChickenSound();
        
    }


    offset = {
        top: 10,
        left: 0,
        right: 0,
        bottom: 10,
    }

   
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.loadImage(this.IMAGES_DEAD);
                if(!this.deadSoundPlayed){
                    this.playSound();
                    this.deadSoundPlayed = true;
                }
                this.chickenFallsDown();
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);

    }


    playSound(){
        if(!isMuted){
            this.dead_chicken_sound.currentTime = 0.5;
            this.dead_chicken_sound.play();
        }   
    }


    chickenFallsDown(){
        setTimeout(() => {
            this.y += 10;
            if (this.y > 500) {
                this.y = 500;
            }
        }, 800);
    }

    
    resetChickenSound() {
        setTimeout(() => {
            this.deadSoundPlayed = false;
        }, 1000);
            
       
    }
}