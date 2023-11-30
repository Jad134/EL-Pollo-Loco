class Coin extends MovableObject {
    height = 100;
    width = 100;


    IMAGES_WALKING = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 400 + Math.random() * 4300;
        this.loadImages(this.IMAGES_WALKING);
        this.y = 150 + Math.random() * 200;
        this.animate();
    }


     /**
     * This function runs the animations
     */
    animate() {
        setInterval(() => this.playAnimation(this.IMAGES_WALKING), 700);
    }
}


