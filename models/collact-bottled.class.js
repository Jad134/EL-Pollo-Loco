class CollectBottles extends MovableObject{
    height = 100;
    width = 100;
    min = 200;
    max = 4500;


    IMAGES_BOTTLED = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]


    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLED);
        this.x = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
        this.y = 320
        this.animate();
    }


    animate() {
        setInterval(() => this.playAnimation(this.IMAGES_BOTTLED), 700);
    }
}