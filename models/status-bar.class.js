class StatusBar extends DrawableObject {
    IMAGES_ENERGY = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',

    ];

    percentage = 100;


    constructor() {
        super();
        this.loadImages(this.IMAGES_ENERGY);
        this.height = 50;
        this.width = 200;
        this.x = 40; 
        this.y = 0; 
        this.setPercentage(100);
    }


    /**
     * This function indicates the respective image, depending on which percentage has been reached
     * 
     * @param {number} percentage 
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_ENERGY[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * 
     * @returns number depends on percentage for the Images Array
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        }
        else if (this.percentage > 40) {
            return 2;
        }
        else if (this.percentage > 20) {
            return 1;
        }
        else {
            return 0;
        }
    }

}