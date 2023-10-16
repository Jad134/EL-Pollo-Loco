class MovableObject {
    x = 120;
    y = 220;
    img;
    height = 150;
    width = 100;


    loadImage(path) {
        this.img = new Image(); // this.img = document.getelementById('Image')
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right')
    }

    moveLeft() {

    }
}