class Endbossbar extends DrawableObject{
IMAGES_ENDBOSSBAR = [
    'img/7_statusbars/2_statusbar_endboss/blue.png',
    'img/7_statusbars/2_statusbar_endboss/green.png',
    'img/7_statusbars/2_statusbar_endboss/orange.png',
]



constructor() {
    super();
    this.loadImages(this.IMAGES_ENDBOSSBAR);
    this.height = 50;
    this.width = 200;
    this.x = 500;
    this.y = 0;
    this.setPercentageBottle(0);
    
}

percentage = 0;

setPercentageBottle(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_ENDBOSSBAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
}

resolveImageIndex() {
    if (this.percentage == 0) {
        return 0;
    } else if (this.percentage == 1) {
        return 1;
    } else if (this.percentage == 2) {
        return 2;
    }
    

}

}