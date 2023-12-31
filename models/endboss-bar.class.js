class Endbossbar extends DrawableObject {
    IMAGES_ENDBOSSBAR = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
    ]



    constructor() {
        super();
        this.loadImages(this.IMAGES_ENDBOSSBAR);
        this.height = 50;
        this.width = 200;
        this.x = 500;
        this.y = 30;
        this.setPercentage(100);

    }

    percentage = 0;


    /**
     * This function indicates the respective image, depending on which percentage has been reached
     * 
     * @param {number} percentage 
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_ENDBOSSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


     /**
     * 
     * @returns number depends on percentage for the Images Array
     */
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        }
        else if (this.percentage > 40) {
            return 2;
        }
        else if (this.percentage >= 20) {
            return 1;
        }
        else {
            return 0;
        }
    }

}