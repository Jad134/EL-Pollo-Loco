class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500 - 200;

        this.animate()
    }


    animate() {
        setInterval(() => {
            this.x -= 0.15;
            if(this.x < -500){
                this.x = 700
            }
        }, 1000/ 60);
        
    }
}
