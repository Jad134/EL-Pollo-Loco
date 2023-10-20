class Coin extends MovableObject {
    height = 80;
    width = 80;


    IMAGES_WALKING = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 200 + Math.random() * 1300;
        this.loadImages(this.IMAGES_WALKING);
        this.y = 150 + Math.random() * 200;
        this.animate();
    }
    animate() {

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 700);
    }
}


