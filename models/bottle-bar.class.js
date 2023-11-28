class Bottlebar extends DrawableObject{
    IMAGES_BOTTLEBAR = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ]

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLEBAR);
        this.height = 50;
        this.width = 200;
        this.x = 40;
        this.y = 80;
        this.setPercentageBottle(0);
        
    }


    percentage = 0;

    /**
     * This function indicates the respective image, depending on which percentage has been reached
     * 
     * @param {number} percentage 
     */
    setPercentageBottle(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLEBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * 
     * @returns number depends on percentage for the Images Array
     */
    resolveImageIndex() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage == 1) {
            return 1;
        } else if (this.percentage == 2) {
            return 2;
        }
        else if (this.percentage == 3) {
            return 3;
        }
        else if (this.percentage == 4) {
            return 4;
        }
        else if (this.percentage == 5)
            return 4;
        else if (this.percentage >= 6)
            return 5;

    }

}