class BackgroundObject extends MovableObject {
width = 400
height = 300

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = 0;
        this.y = 180;
    }
}