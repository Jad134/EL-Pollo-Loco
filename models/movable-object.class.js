class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;

    loadImage(path) {
        this.img = new Image(); // this.img = document.getelementById('Image')
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
           this.imageCache[path] = img;
        });
    }


    moveRight() {
        console.log('Moving right')
    }

    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;
            if(this.x < -500){
                this.x = 700
            }
        }, 1000/ 60);
    }
}